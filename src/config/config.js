import { config } from "dotenv";
config();
export default {
  PORT: process.env.PORT,
  DB_HOST: process.env.DB_HOST,
  DB_DATABASE: process.env.DB_DATABASE,
  TOKEN_AUTH: process.env.TOKEN_AUTH,
};
