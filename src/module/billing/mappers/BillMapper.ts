import { BillAttributes } from "../../../infra/db/models/Bill";
import { Result } from "../../../libs/core/Result";
import { UniqueEntityID } from "../../../libs/domain/UniqueEntityID";
import { ProductPrice } from "../../product/domain";
import { ProductId } from "../../product/domain/ProductId";
import { ProductIdList } from "../../product/domain/ProductIdList";
import { UserEmail } from "../../user/domain";
import { Payment } from "../domain/Payment";
import { PaymentExternalId } from "../domain/PaymentExternalId";
import { PaymentStatus } from "../domain/PaymentStatus";


export class BillMapper {
    static toDTO() {
    };

    static toDomain(props: BillAttributes): Result<Payment> {
        const productIds = props.product_ids.map(p => ProductId.create(new UniqueEntityID(p)).getValue())
        const constPriceOrError = ProductPrice.create(props.price);
        const userEmailOrError = UserEmail.create(props.user_email);
        const productOrError = Payment.create({
            userEmail: userEmailOrError.getValue(),
            price: constPriceOrError.getValue(),
            productIdList: ProductIdList.create(productIds), // TODO: in future
            externalId: PaymentExternalId.create(new UniqueEntityID(props.external_id)).getValue(),
            status: PaymentStatus.create(props.status).getValue(),
        }, new UniqueEntityID(props.id));

        return productOrError;
    };

    static toPersistence(payment: Payment) {
        return {
            id: payment.PaymentId.stringValue,
            user_email: payment.userEmail.value,
            price: payment.price.value,
            product_ids: payment.ProductIdList.getItems().map(i => i.stringValue),
            external_id: payment.externalId.stringValue,
            status: payment.status.value,
        }
    };
}