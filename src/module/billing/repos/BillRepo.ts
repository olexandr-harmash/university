import { Result } from "../../../libs/core/Result";
import { UniqueEntityID } from "../../../libs/domain/UniqueEntityID";
import { Payment } from "../domain/Payment";

export default interface BillRepository {
    create(bill: Payment): Promise<void>;
    save(bill: Payment): Promise<void>;
    getByExternalID(id: UniqueEntityID): Promise<Result<Payment>>
}