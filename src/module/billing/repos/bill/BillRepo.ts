import { models } from "../../../../infra/db/models";
import { Result } from "../../../../libs/core/Result";
import { UniqueEntityID } from "../../../../libs/domain/UniqueEntityID";
import { Payment } from "../../domain/Payment";
import { BillMapper } from "../../mappers/BillMapper";
import BillRepository from "../BillRepo";

export class BillRepositoryImp implements BillRepository {
    /**
     * TODO: strict type for models, or directly initialize models = models.
     */
    private models: typeof models;

    constructor(m: typeof models) {
        this.models = m;
    }

    async getByExternalID(id: UniqueEntityID): Promise<Result<Payment>> {
        const billModel = this.models.Bill;

        const rawBill = await billModel.findOne({
            where: {
                external_id: id.toString()
            }
        });

        if (!rawBill) {
            return Result.fail<Payment>('Not found');
        }

        return BillMapper.toDomain(rawBill);
    }
    /**
     * TODO: delete dublicates and pagination
     */
    async create(payment: Payment) {
        const billModel = this.models.Bill;

        const rawSequilizePayment = BillMapper.toPersistence(payment);

        await billModel.create(rawSequilizePayment);
    };

    async getByEmail() {

    }

    async save(payment: Payment) {
        const billModel = this.models.Bill;

        const rawSequilizePayment = BillMapper.toPersistence(payment);

        const sequilizeBillInstance = await billModel.findOne({
            where: {
                external_id: rawSequilizePayment.external_id
            }
        });

        if (!sequilizeBillInstance) {
            await billModel.create(rawSequilizePayment);
        } else {
            await sequilizeBillInstance.update(rawSequilizePayment);
        }
    }
};