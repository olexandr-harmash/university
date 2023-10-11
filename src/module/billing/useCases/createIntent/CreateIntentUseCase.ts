import { AppError } from "../../../../libs/core/AppError";
import { Either, Result, left, right } from "../../../../libs/core/Result";
import { UseCase } from "../../../../libs/core/UseCase";
import { UniqueEntityID } from "../../../../libs/domain/UniqueEntityID";
import { ProductPrice } from "../../../product/domain";
import { ProductId } from "../../../product/domain/ProductId";
import { ProductIdList } from "../../../product/domain/ProductIdList";
import ProductRepository from "../../../product/repos/ProductRepo";
import { UserEmail } from "../../../user/domain";
import { Payment } from "../../domain/Payment";
import { PaymentExternalId } from "../../domain/PaymentExternalId";
import { PaymentStatus } from "../../domain/PaymentStatus";
import BillRepository from "../../repos/BillRepo";
import { BillingService } from "../../services/BillingService";
import { CreateIntentDTO, IntentDTOResponce } from "./CreateIntentDTOs";

type Response = Either<
    AppError.UnexpectedError |
    Result<any>,
    Result<IntentDTOResponce>
>

export class PaymentIntentUseCase implements UseCase<CreateIntentDTO, Response> {
    private billingServ: BillingService;
    private productRepo: ProductRepository;
    private billingRepo: BillRepository;

    constructor(productRepo: ProductRepository, billingServ: BillingService, billingRepo: BillRepository) {
        this.productRepo = productRepo;
        this.billingServ = billingServ;
        this.billingRepo = billingRepo;
    };

    async execute(request: CreateIntentDTO): Promise<Response> {
        try {
            const productIdsOrErrors = request.product_ids.map(i => ProductId.create(new UniqueEntityID(i)));
            const productListResult = Result.combine(productIdsOrErrors);

            if (productListResult.isFailure) {
                return left(new AppError.UnexpectedError(productListResult.getErrorValue()));
            }

            const productIds = productIdsOrErrors.map(p => p.getValue());
            const productIdList = ProductIdList.create(productIds);
            const productListOrErrors = await this.productRepo.getListByIds(productIdList);

            if (productListOrErrors.isFailure) {
                return left(new AppError.UnexpectedError(productListOrErrors.getErrorValue()));
            }

            const productList = productListOrErrors.getValue();
            const productsCost = productList.priceSummary();

            const paymentSecret = await this.billingServ.paymentIntent(productsCost, 'usd', {});

            const userEmailOrError = UserEmail.create(request.user.email);
            const externalIdOrError = PaymentExternalId.create(new UniqueEntityID(paymentSecret));
            const constPriceOrError = ProductPrice.create(productsCost);

            const billOrError = Payment.create({
                userEmail: userEmailOrError.getValue(),
                price: constPriceOrError.getValue(),
                productIdList: productIdList,
                externalId: externalIdOrError.getValue(),
                status: PaymentStatus.create('pending').getValue(),
            });

            if (billOrError.isFailure) {
                return left(new AppError.UnexpectedError(billOrError.getErrorValue()));
            }

            await this.billingRepo.save(billOrError.getValue());

            return right(Result.ok<IntentDTOResponce>({
                secret: paymentSecret
            }));
        } catch (err) {
            return left(new AppError.UnexpectedError(err));
        };
    };
}