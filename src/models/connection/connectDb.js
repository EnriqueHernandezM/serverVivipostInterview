import mysql from "mysql2/promise";
import config from "../../config/config.js";

export const connection = await mysql.createConnection({
  host: +config.DB_HOST,
  database: config.DB_DATABASE,
});
connection.query(`CREATE TABLE IF NOT EXISTS menu (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  parent_id INT DEFAULT NULL,
  level INT NOT NULL,
  CONSTRAINT fk_parent FOREIGN KEY (parent_id) REFERENCES menu(id)
)`);
