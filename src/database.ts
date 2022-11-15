
import * as mysql from 'mysql2/promise';

import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../.env") });


const host = process.env.MYSQL_HOST || "127.0.0.1"
const user = process.env.MYSQL_USER || "root";
const password = process.env.MYSQL_PASSWORD || "123456";
const database = process.env.MYSQL_DB || "wc_qatar";
const port = parseInt(process.env.MYSQL_PORT!) || 3306;

console.log(`mysql setting: ${host} ${port} ${user} ${password} ${database}`);

export var pool = mysql.createPool({
    connectionLimit: 10,
    host,
    user,
    password,
    database,
    port
});

// pool.getConnection((err: any, connection: any) => {
//     if (err) {
//         if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//             console.error('Database connection was closed.')
//         }
//         if (err.code === 'ER_CON_COUNT_ERROR') {
//             console.error('Database has too many connections.')
//         }
//         if (err.code === 'ECONNREFUSED') {
//             console.error('Database connection was refused.')
//         }
//     }
//     if (connection) connection.release()
//     return
// });
