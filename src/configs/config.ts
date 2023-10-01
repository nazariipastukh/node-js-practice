import { config } from "dotenv";

config();

export const configs = {
  DB_URL:
    process.env.DB_URL ||
    "mongodb+srv://nazariipastukh:nazariipastukh@node-practice.2ov4pua.mongodb.net/",
  PORT: process.env.PORT || 5001,
};
