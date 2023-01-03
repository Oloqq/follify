// User configuration

import fs from "fs"
import sqlite3, { Database } from "sqlite3";
import { configlog as log } from "../logs";

export interface UserConfig {
  
    id_user: string;
    oldest_song_age: number;
    latest_song_age: number;
    interval: number;
    last_created: string;
    subscribed: boolean;
}

export class ConfigDB {
  db: Database;

  constructor(dbFile: string) {
    const dbPath = `.data/${dbFile}.db`;

    this.db = new sqlite3.Database(dbPath);
    if (!fs.existsSync(dbPath)) {
        log.info("Creating table configuration", dbPath);
  
        this.db.get('PRAGMA foreign_keys = ON'); // Enable foreign keys
  
        this.db.serialize(() => {
          this.db.run(`
            CREATE TABLE configuration (
              id_user varchar(20) NOT NULL PRIMARY KEY,
              oldest_song_age INT,
              latest_song_age INT,
              interval INT,
              last_created DATE,
              subscribed BOOLEAN
            )
          `);
        });
        var sql = `INSERT INTO configuration (id_user, oldest_song_age, latest_song_age, interval, last_created, subscribed)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(id_user) DO UPDATE
        SET oldest_song_age=?2, latest_song_age=?3, interval=?4, last_created=?5, subscribed=?6
        WHERE id_user='?1'`;
        const data: UserConfig  = {
            id_user: 'default',
            oldest_song_age: 0,
            latest_song_age:0,
            interval: 0,
            last_created: '2000/01/01',
            subscribed: false,
        } 

        this.db.run(sql, [data.id_user, data.oldest_song_age, data.latest_song_age, data.interval, data.last_created, data.subscribed], (err: any) => {
            if (err) {
              log.error('Failed default settings. ', err);
            } else {
              log.info('Settings inserted properly');
            }
        });
      }
  }

  restoreDefault(userId: string): void {
    // don't hardcode defaults here
    // store them as a record in a separate table
    // hardcode them in the constructor
    // this way, once the db is initialized we can change defaults at will without recompiling the app
    var sql = `UPDATE configuration SET 
        oldest_song_age=def.oldest_song_age, 
        latest_song_age=def.latest_song_age, 
        interval=def.interval, 
        last_created=def.last_created, 
        subscribed=def.subscribed
        FROM configuration def 
        WHERE id_user='?' AND def.id_user='default'`;
    this.db.run(sql,[userId], (err: any) => {
        if (err) {
        log.error('Failed to put a user. ', err);
        } else {
        log.info('User data upserted for: ', userId);
        }
    });
  }

  put(userId: string, config: Partial<UserConfig>): boolean {
    var sql = `INSERT INTO configuration (id_user, oldest_song_age, latest_song_age, interval, last_created, subscribed)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(id_user) DO UPDATE
    SET oldest_song_age=?2, latest_song_age=?3, interval=?4, last_created=?5, subscribed=?6
    WHERE id_user='?1'`;
    let success = true;
    this.db.run(sql, [userId, config.oldest_song_age, config.latest_song_age, config.interval, config.last_created, config.subscribed], (err: any) => {
        if (err) {
        success = false;
        log.error('Failed to put a user. ', err);
        } else {
        log.info('User data upserted for: ', userId);
        }
    });
    return success;
  }

  get(userId: string): Promise<UserConfig> {
    var sql = `SELECT * FROM configuration WHERE id_user='${userId}'`;
    return new Promise((resolve, reject) =>{
      this.db.get(sql, (err: any, row: any)=>{
        if (err) {
          log.error('Failed to get user data.', err);
          reject(false);
        }
        resolve({
          id_user: row.id_user,
          oldest_song_age: row.oldest_song_age,
          latest_song_age: row.latest_song_age,
          interval: row.interval,
          last_created: row.last_created,//new Date(parseFloat(row.last_created)),
          subscribed: row.subscribed,
        });
      });
    });
  }
}

export const configDB = new ConfigDB("cache");
export default configDB;
