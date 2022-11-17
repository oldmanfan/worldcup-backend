import {pool} from "./database";

// 推荐码下单
export interface ReferralBet {
    chainId: number,
    wallet: string;
    matchId: string;
    guessType: string;
    payToken: string;
    betAmount: string;
    betTime: string;
    referralCode: string;
    txHash: string;
}

// 某个钱包地址的推荐码
export interface ReferralCode {
    wallet: string;
    referralCode: string;
}

export function validReferralBet(refBet: ReferralBet): string | null {
    if (!refBet.chainId ) {
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

export function validReferralCode(refCode: ReferralCode): string | null {
    if (!refCode.wallet || refCode.wallet.length == 0) {
        return "wallet is invalid";
    }
    if (!refCode.referralCode || refCode.referralCode.length == 0) {
        return "referralCode is invalid";
    }

    return null;
}

export class WCDB {

    static async WriteRefCode(refCode: ReferralCode) {
        let sql = 'INSERT INTO ref_codes(Id, wallet, ref_code) VALUES(0,?,?)';
        let params = [refCode.wallet, refCode.referralCode];

        return await pool.execute(sql, params)
    }

    static async QueryRefCode(wallet: string) {
        let sql = 'SELECT ref_code from ref_codes where wallet = ?';
        let parmas = [wallet];

        return await pool.query(sql, parmas);
    }

    static async WriteRefBets(bet: ReferralBet) {
        let sql = 'INSERT INTO ref_bets(Id, chain_id, wallet, match_id, guess_type, pay_token, bet_amount, bet_time, ref_code, tx_hash) VALUES(0,?,?,?,?,?,?,?,?,?)';
        let params = [bet.chainId, bet.wallet, bet.matchId, bet.guessType, bet.payToken, bet.betAmount, bet.betTime, bet.referralCode, bet.txHash];

        await pool.execute(sql, params)
    }
}