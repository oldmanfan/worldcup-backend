export interface ApiResult {
    code: number;
    message: string;
}

export class ApiResults {

    static OK(message: string = "success"): ApiResult { return { code: 200, message }; }

    static PARAM_ERROR(message: string = "parameters not correct"): ApiResult { return { code: 5001, message }; }
    static SIGNATURE_ERROR(message: string = "signature not match"): ApiResult { return { code: 5002, message }; }
    static DB_ERROR(message: string = "db error"): ApiResult { return { code: 5003, message }; }
    static UNKNOWN_ERROR(message: string = "unknown error"): ApiResult { return { code: 5100, message }; }
}