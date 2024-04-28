import { config } from "dotenv";

config({ path: ["./resources/.env", ".env"] });
export default {
  PORT: process.env.PORT,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
  TOKEN_AUTH: process.env.TOKEN_AUTH,
};
