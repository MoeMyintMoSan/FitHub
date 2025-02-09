import { neon } from "@neondatabase/serverless";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error("Database URL is not defined!");
}

const sql = neon(DATABASE_URL);


console.log("SQL Connection:", sql);
export default sql;
