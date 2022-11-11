"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResults = void 0;
class ApiResults {
    static OK(message = "success") { return { code: 200, message }; }
    static PARAM_ERROR(message = "parameters not correct") { return { code: 5001, message }; }
    static SIGNATURE_ERROR(message = "signature not match") { return { code: 5002, message }; }
    static DB_ERROR(message = "db error") { return { code: 5003, message }; }
    static UNKNOWN_ERROR(message = "unknown error") { return { code: 5100, message }; }
}
exports.ApiResults = ApiResults;
//# sourceMappingURL=api-result.js.map