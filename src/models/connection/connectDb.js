import mysql from "mysql2/promise";
import config from "../../config/config.js";

export const connection = await mysql.createConnection({
  host: config.DB_HOST,
  user: config.DB_USER,
  database: config.DB_DATABASE,
  password: config.DB_PASSWORD,
});
