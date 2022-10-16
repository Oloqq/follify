if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

function assertEnv(variable: string): string {
  if (process.env[variable] === undefined) {
    console.log(`FATAL: environment variable ${variable} is not set`);
    process.exit();
  }
  return process.env[variable]!;
}

export class Environment {
  static readonly clientId = assertEnv("SPOTIFY_CLIENT_ID");
  static readonly clientSecret = assertEnv("SPOTIFY_CLIENT_SECRET");
  static readonly callback = assertEnv("CALLBACK");
  static readonly nodeEnv = assertEnv("NODE_ENV");
  static readonly port = assertEnv("PORT");
  static readonly frontend = assertEnv("FRONTEND");
  static readonly sessionSecret = assertEnv("SESSION_SECRET");
}

// export const env = new Environment();

export default Environment;

import fs from "fs";
(function verifyFilesystem() {
  const logdir = './logs';
  if (!fs.existsSync(logdir)) {
    fs.mkdirSync(logdir, { recursive: true });
  }

  const dbdir = './.data';
  if (!fs.existsSync(dbdir)) {
    fs.mkdirSync(dbdir, { recursive: true });
  }
})
