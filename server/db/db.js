import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "smart_mart",
});

if (!db.connect) {
  console.log("Error connecting to database");
}
