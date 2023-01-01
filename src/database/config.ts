// User configuration

import fs from "fs"
import sqlite3, { Database } from "sqlite3";
import { configlog as log } from "../logs";

export interface UserConfig {
  // described in Notion
}

export class ConfigDB {
  db: Database;

  constructor(dbFile: string) {
    const dbPath = `.data/${dbFile}.db`;

    this.db = new sqlite3.Database(dbPath);
  }

  restoreDefault(userId: string): void {
    // don't hardcode defaults here
    // store them as a record in a separate table
    // hardcode them in the constructor
    // this way, once the db is initialized we can change defaults at will without recompiling the app
  }

  put(userId: string, config: Partial<UserConfig>): void {

  }

  get(userId: string): Promise<UserConfig>|undefined {
    return undefined;
  }
}

export const configDB = new ConfigDB("cache");
export default configDB;