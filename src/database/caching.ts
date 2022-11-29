// Caching spotify data

import fs from "fs"
import sqlite3, { Database } from "sqlite3";
import { dblog as log } from "../logs";

export class CacheDB {
  db: Database;

  constructor(dbFile: string) {
    const dbPath = `.data/${dbFile}.db`;

    this.db = new sqlite3.Database(dbPath);
    if (!fs.existsSync(dbPath)) {
      log.info("Creating table authorization", dbPath);

      this.db.get('PRAGMA foreign_keys = ON'); // Enable foreign keys

      this.db.serialize(() => {
        this.db.run(`
          CREATE TABLE authorization (
            id_auth varchar(20) NOT NULL PRIMARY KEY,
            access_token TEXT,
            expiry TEXT,
            refresh_token TEXT
          )
        `);
      });
    }
  }

  put(data: UserTokens): boolean {
    var sql = `INSERT INTO authorization(id_auth, access_token, expiry, refresh_token)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(id_auth) DO UPDATE
        SET access_token=?2, expiry=?3, refresh_token=?4
        WHERE id_auth='?1'`;
    let success = true;
    this.db.run(sql, [data.userId, data.accessToken, data.expiry, data.refreshToken], (err: any) => {
      if (err) {
        success = false;
        log.error('Failed to put a user. ', err);
      } else {
        log.info('User data upserted for: ', data.userId);
      }
    });
    return success;
  }

  get(id: string): Promise<UserTokens> {
    var sql = `SELECT * FROM authorization WHERE id_auth=${id}`;
    return new Promise((resolve, reject) =>{
      this.db.get(sql, (err: any, row: any)=>{
        if (err) {
          log.error('Failed to get user data.', err);
          reject(false);
        }
        resolve({
          userId: row.id_auth,
          accessToken: row.access_token,
          expiry: new Date(parseFloat(row.expiry)),
          refreshToken: row.refresh_token,
        });
      });
    });
  }
}

export const cacheDB = new CacheDB("cache");
export default cacheDB;