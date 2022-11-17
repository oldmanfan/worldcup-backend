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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WCDB = exports.validReferralCode = exports.validReferralBet = void 0;
const database_1 = require("./database");
function validReferralBet(refBet) {
    if (!refBet.chainId) {
        return "chainId is undefined";
    }
    if (!refBet.wallet || refBet.wallet.length == 0) {
        return "wallet is invalid";
    }
    if (!refBet.matchId || refBet.matchId.length == 0) {
        return "matchId is invalid";
    }
    if (!refBet.guessType || refBet.guessType.length == 0) {
        return "guessType is invalid";
    }
    if (!refBet.payToken || refBet.payToken.length == 0) {
        return "payToken is invalid";
    }
    if (!refBet.betAmount || refBet.betAmount.length == 0) {
        return "betAmount is invalid";
    }
    if (!refBet.betTime || refBet.betTime.length == 0) {
        return "betTime is invalid";
    }
    if (!refBet.referralCode || refBet.referralCode.length == 0) {
        return "referralCode is invalid";
    }
    return null;
}
exports.validReferralBet = validReferralBet;
function validReferralCode(refCode) {
    if (!refCode.wallet || refCode.wallet.length == 0) {
        return "wallet is invalid";
    }
    if (!refCode.referralCode || refCode.referralCode.length == 0) {
        return "referralCode is invalid";
    }
    return null;
}
exports.validReferralCode = validReferralCode;
class WCDB {
    static WriteRefCode(refCode) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = 'INSERT INTO ref_codes(Id, wallet, ref_code) VALUES(0,?,?)';
            let params = [refCode.wallet, refCode.referralCode];
            return yield database_1.pool.execute(sql, params);
        });
    }
    static QueryRefCode(wallet) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = 'SELECT ref_code from ref_codes where wallet = ?';
            let parmas = [wallet];
            return yield database_1.pool.query(sql, parmas);
        });
    }
    static WriteRefBets(bet) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = 'INSERT INTO ref_bets(Id, chain_id, wallet, match_id, guess_type, pay_token, bet_amount, bet_time, ref_code, tx_hash) VALUES(0,?,?,?,?,?,?,?,?,?)';
            let params = [bet.chainId, bet.wallet, bet.matchId, bet.guessType, bet.payToken, bet.betAmount, bet.betTime, bet.referralCode, bet.txHash];
            yield database_1.pool.execute(sql, params);
        });
    }
}
exports.WCDB = WCDB;
//# sourceMappingURL=referral.js.map