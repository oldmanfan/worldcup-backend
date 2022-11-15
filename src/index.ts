import express from "express";
import { ApiResults } from "./api-result";
import { ReferralBet, ReferralCode, validReferralBet, validReferralCode, WCDB } from "./referral";

const app = express();

app.use(express.json());


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    next();
});


// 保存用户的下注纪录
app.post('/bet', async (req, res) => {
    try {
        const info = req.body as ReferralBet;
        let v = validReferralBet(info);
        if (v) {
            res.send(ApiResults.PARAM_ERROR(v as string));
            return;
        }

        await WCDB.WriteRefBets(info);
        res.send(ApiResults.OK());
    } catch (e) {
        res.send(ApiResults.UNKNOWN_ERROR(`${e}`));
    }
});

// 保存一个用户的邀请码.
app.post('/refcode', async (req, res) => {
    try {
        const info = req.body as ReferralCode;
         let v = validReferralCode(info);
        if (v) {
            res.send(ApiResults.PARAM_ERROR(v as string));
            return;
        }

        await WCDB.WriteRefCode(info);
        res.send(ApiResults.OK());
    } catch (e) {
        res.send(ApiResults.UNKNOWN_ERROR(`${e}`));
    }
})

// 查询一个wallet地址是否有邀请码, 如果有就直接用现存的.
// 如果没有, 就按项目方的要求调用API生成一个, 然后保存起来.
app.get('/refcode', async (req, res) => {
    try {
        const { wallet } = req.query;
        if (!wallet || (wallet as string).length == 0) {
            res.send(ApiResults.PARAM_ERROR("parameter 'wallet' is null or empty"));
            return;
        }

        const r = await WCDB.QueryRefCode(wallet as string);
        res.send(ApiResults.OK(JSON.stringify(r[0])));
    } catch (e) {
        res.send(ApiResults.UNKNOWN_ERROR(`${e}`));
    }
});

app.listen(3000, () => {
    console.log(`The main entry point: http://127.0.0.1:3000`);
});
