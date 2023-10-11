import { JWTClaims } from "../../../user/domain";
import { ClientSecret } from "../../domain/Intent";

export interface CreateIntentDTO {
    user: JWTClaims;
    currency: string;
    product_ids: string[];
};

export interface IntentDTOResponce {
    secret: ClientSecret;
};