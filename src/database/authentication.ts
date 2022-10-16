import fs from "fs"
import sqlite3, { Database } from "sqlite3";
import { dblog as log } from "../logs";

export class AuthDB {
  db: Database;

  constructor(dbFile: string) {
    this.db = new sqlite3.Database(dbFile);
    if (!fs.existsSync(dbFile)) {
      this.db.get('PRAGMA foreign_keys = ON'); // Enable foreign keys

      this.db.serialize(() => {
        log.info("Creating table user_auth");
        this.db.run(`
          CREATE TABLE user_auth (
            id varchar(20) NOT NULL PRIMARY KEY,
            access_token TEXT,
            expiry TEXT,
            refresh_token TEXT
          )
        `);
      });
    }
  }
}