import { messages } from "../constants/messages.constants";
import { codes } from "../constants/api_response_codes.constants";

export class CustomError extends Error {
    public code: string = codes.DEFAULT_ERROR_CODE;
    public message: string = messages.GENERIC;
    public status: number = codes.DEFAULT_ERROR_STATUS_CODE;
    public data: [] | undefined;

    public constructor(
        code: string,
        message: string,
        status: number,
        data?: [] | undefined,
        ...params: []) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError);
        }

        this.code = code;
        this.status = status;
        this.message = message;
        this.data = data;
    }
}