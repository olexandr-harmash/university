import { AppError } from "../../../../libs/core/AppError";
import { Guard } from "../../../../libs/core/Guard";
import { Either, Result, left, right } from "../../../../libs/core/Result";
import { UseCase } from "../../../../libs/core/UseCase";
import { UniqueEntityID } from "../../../../libs/domain/UniqueEntityID";
import { PaymentExternalId } from "../../domain/PaymentExternalId";
import BillRepository from "../../repos/BillRepo";
import { BillingService } from "../../services/BillingService";
import { ProcessPaymentErrors } from "./ProcessIntentErrors";

type Response = Either<
    AppError.UnexpectedError |
    ProcessPaymentErrors.BillWasNotCreatedError |
    Result<any>,
    Result<void>
>

/**
 * Test functionality feature
 */
export class ProcessIntentUseCase implements UseCase<any, Response> {
    private billingService: BillingService;
    private billRepo: BillRepository;
    /**
     * TODO: init via constructor
     */
    constructor(billRepo: BillRepository, billingService: BillingService) {
        this.billRepo = billRepo;
        this.billingService = billingService;
    };

    /**
     * TODO: Make structure with type
     */
    /**
     * TODO: status formalize
     */
    private async handlingPayment(paymentIntent: any, status: string): Promise<Response> {
        const externalIdOrError = PaymentExternalId.create(new UniqueEntityID(paymentIntent.client_secret)); //todo something wuth external id
        const propsOrError = Guard.combine([externalIdOrError]);

        if (propsOrError.isFailure) {
            return left(new AppError.UnexpectedError(propsOrError.getErrorValue()));
        }

        const externalId = externalIdOrError.getValue();
        const billOrError = await this.billRepo.getByExternalID(new UniqueEntityID(externalId.stringValue));

        if (billOrError.isFailure) {
            return left(new ProcessPaymentErrors.BillWasNotCreatedError());
        };

        const bill = billOrError.getValue();

        bill.setStatus(status);

        await this.billRepo.save(bill);

        return right(Result.ok<void>());
    };

    async execute(request: any): Promise<Response> {
        try {
          
            const event = this.billingService.paymentResult(request.rawBody, request.stripe_signature); //make fabric that create internal event object depends on domein of payment partner
            // Handle the event
            /**
             * TODO: instead create update status functionality
             */
            switch (event.type) {
                case 'payment_intent.succeeded':
                    const paymentIntent = event.data.object;
                    console.log(paymentIntent.client_secret)
                    return await this.handlingPayment(paymentIntent, event.type);
                case 'payment_method.attached':
                    const paymentMethod = event.data.object;
                    //return await this.handlingPayment(paymentMethod);
                default:
                    const someInfoLol = event.data.object; //only for working test enviroment
                    //return await this.handlingPayment(someInfoLol);
            }

            return right(Result.ok<void>());
        } catch (err) {
            return left(new AppError.UnexpectedError(err));
        };
    };
}