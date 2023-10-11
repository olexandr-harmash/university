import { Guard } from "../../../libs/core/Guard";
import { Result } from "../../../libs/core/Result";
import { AggregateRoot } from "../../../libs/domain/AggregateRoot";
import { UniqueEntityID } from "../../../libs/domain/UniqueEntityID";
import { ProductPrice } from "../../product/domain";
import { ProductId } from "../../product/domain/ProductId";
import { ProductIdList } from "../../product/domain/ProductIdList";
import { UserEmail } from "../../user/domain";
import { PaymentExternalId } from "./PaymentExternalId";
import { PaymentId } from "./PaymentId";
import { PaymentStatus } from "./PaymentStatus";

export interface PaymentAttributes {
    userEmail: UserEmail;
    price: ProductPrice;
    productIdList: ProductIdList;
    externalId: PaymentExternalId;
    status: PaymentStatus;
}

export class Payment extends AggregateRoot<PaymentAttributes> {
    get PaymentId(): ProductId {
        return PaymentId.create(this._id).getValue();
    }

    get externalId(): PaymentExternalId {
        return this.props.externalId;
    }

    get userEmail(): UserEmail {
        return this.props.userEmail;
    }

    get status(): PaymentStatus {
        return this.props.status;
    }

    get price(): ProductPrice {
        return this.props.price;
    }

    get ProductIdList(): ProductIdList {
        return this.props.productIdList;
    }

    setStatus(value: string): Result<string> {
        //TODO: make it in service
        const statusOrError = PaymentStatus.create(value);

        if (statusOrError.isFailure) {
            return Result.fail('Cannot set status.')
        }

        this.props.status = statusOrError.getValue();

        return Result.ok<string>()
    }

    public static create(props: PaymentAttributes, id?: UniqueEntityID): Result<Payment> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.productIdList, argumentName: 'product id' },
            { argument: props.userEmail, argumentName: 'user email' },
            { argument: props.price, argumentName: 'price' },
            { argument: props.externalId, argumentName: 'external id' },
            { argument: props.status, argumentName: 'status' },
        ]);

        if (guardResult.isFailure) {
            return Result.fail<Payment>(guardResult.getErrorValue());
        };

        const payment = new Payment(props, id);

        return Result.ok<Payment>(payment);
    };
}