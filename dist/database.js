"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const mysql = require('mysql2/promise');
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "../.env") });
const host = process.env.MYSQL_HOST || "127.0.0.1";
const user = process.env.MYSQL_USER || "root";
const password = process.env.MYSQL_PASSWORD || "123456";
const database = process.env.MYSQL_DB || "wc_qatar";
console.log(`mysql setting: ${host} ${user} ${password} ${database}`);
exports.pool = mysql.createPool({
    connectionLimit: 10,
    host,
    user,
    password,
    database
});
exports.pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
    }
    if (connection)
        connection.release();
    return;
});
//# sourceMappingURL=database.js.map