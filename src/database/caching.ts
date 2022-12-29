// Caching spotify data

import fs from "fs"
import sqlite3, { Database } from "sqlite3";
import { dblog as log } from "../logs";

export class CacheDB {
  db: Database;

  constructor(dbFile: string) {
    const dbPath = `.data/${dbFile}.db`;

    this.db = new sqlite3.Database(dbPath);
  }

  put(artist: Artist, album: Album, tracks: Track[]): boolean {
    return false;
  }

  get(artist: Artist, minDate: Date, maxDate: Date): Promise<Track[]>|undefined {
    return undefined;
  }
}

export const cacheDB = new CacheDB("cache");
export default cacheDB;