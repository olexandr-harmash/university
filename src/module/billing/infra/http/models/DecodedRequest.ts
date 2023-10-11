import express from "express";
import { JWTClaims } from "../../../../user/domain";

export interface DecodedExpressRequest extends express.Request {
    decoded: JWTClaims;
}