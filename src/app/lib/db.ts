import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dataDir = path.resolve("./data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.resolve(dataDir, "app.db");

const db = new Database(dbPath, {
  verbose: process.env.NODE_ENV === "development" ? console.log : undefined,
});

export default db;
