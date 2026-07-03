import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Madhan@123",
  database: "jobboard",
});

export default db;