// Storage for tokens needed for authentication

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

  putUser(id: any, accessToken: any, expiry: any, refreshToken: any) {
    var sql = `INSERT INTO user_auth(id, access_token, expiry, refresh_token)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE
        SET access_token=?2, expiry=?3, refresh_token=?4
        WHERE id=?1`;
    this.db.run(sql, [id, accessToken, expiry, refreshToken], (err: any) => {
      if (err) {
        log.error('Failed to put a user. ', err);
      } else {
        log.info('User data upserted for: ', id);
      }
    });
  }

  getUser(id: any) {
    var sql = `SELECT * FROM user WHERE id=${id}`;
    return new Promise((resolve, reject) =>{
      this.db.get(sql, (err: any, row: any)=>{
        if (err) {
          log.error('Failed to get user data.', err);
          reject(false);
        }
        resolve(row);
      });
    });
  }
}

export default AuthDB;