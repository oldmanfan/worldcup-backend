"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_result_1 = require("./api-result");
const referral_1 = require("./referral");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});
// 保存用户的下注纪录
app.post('/bet', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const info = req.body;
        let v = (0, referral_1.validReferralBet)(info);
        if (v) {
            res.send(api_result_1.ApiResults.PARAM_ERROR(v));
            return;
        }
        yield referral_1.WCDB.WriteRefBets(info);
        res.send(api_result_1.ApiResults.OK());
    }
    catch (e) {
        res.send(api_result_1.ApiResults.UNKNOWN_ERROR(`${e}`));
    }
}));
// 保存一个用户的邀请码.
app.post('/refcode', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const info = req.body;
        let v = (0, referral_1.validReferralCode)(info);
        if (v) {
            res.send(api_result_1.ApiResults.PARAM_ERROR(v));
            return;
        }
        yield referral_1.WCDB.WriteRefCode(info);
        res.send(api_result_1.ApiResults.OK());
    }
    catch (e) {
        res.send(api_result_1.ApiResults.UNKNOWN_ERROR(`${e}`));
    }
}));
// 查询一个wallet地址是否有邀请码, 如果有就直接用现存的.
// 如果没有, 就按项目方的要求调用API生成一个, 然后保存起来.
app.get('/refcode', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { wallet } = req.query;
        if (!wallet || wallet.length == 0) {
            res.send(api_result_1.ApiResults.PARAM_ERROR("parameter 'wallet' is null or empty"));
            return;
        }
        const r = yield referral_1.WCDB.QueryRefCode(wallet);
        res.send(api_result_1.ApiResults.OK(JSON.stringify(r[0])));
    }
    catch (e) {
        res.send(api_result_1.ApiResults.UNKNOWN_ERROR(`${e}`));
    }
}));
app.listen(3000, () => {
    console.log(`The main entry point: http://127.0.0.1:3000`);
});
//# sourceMappingURL=index.js.map