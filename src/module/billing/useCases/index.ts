import DomainController from "../../../libs/core/DomainController";
import { BaseController } from "../../../libs/core/http/BaseController";
import ProductRepository from "../../product/repos/ProductRepo";
import BillRepository from "../repos/BillRepo";
import { paymentService } from "../services";
import { PaymentIntentController } from "./createIntent/CreateIntentController";
import { PaymentIntentUseCase } from "./createIntent/CreateIntentUseCase";
import { ProcessIntentController } from "./processIntentResult/ProcessIntentController";
import { ProcessIntentUseCase } from "./processIntentResult/ProcessIntentUseCase";


export class BillingController extends DomainController {
    readonly paymentIntent: BaseController;
    readonly processIntent: BaseController;

    constructor (productRepo: ProductRepository, billRepo: BillRepository) {
        super();

        const paymentIntentUseCase = new PaymentIntentUseCase(productRepo, paymentService, billRepo);
        const processIntentUseCase = new ProcessIntentUseCase(billRepo, paymentService);

        this.paymentIntent = new PaymentIntentController(paymentIntentUseCase);
        this.processIntent = new ProcessIntentController(processIntentUseCase);
    };
};
