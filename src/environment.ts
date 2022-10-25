if (process.env.NODE_ENV !== "production") { // PROD should have those set in the environment already
  require("dotenv").config();
}

function assertEnv(variable: string): string {
  if (process.env[variable] === undefined) {
    console.log(`FATAL: environment variable ${variable} is not set`); // TODO use logger
    process.exit();
  }
  return process.env[variable]!;
}

// Wrapper for environment variables
export class Environment {
  static readonly clientId = assertEnv("SPOTIFY_CLIENT_ID");
  static readonly clientSecret = assertEnv("SPOTIFY_CLIENT_SECRET");
  static readonly callback = assertEnv("CALLBACK");
  static readonly nodeEnv = assertEnv("NODE_ENV");
  static readonly port = assertEnv("PORT");
  static readonly frontend = assertEnv("FRONTEND");
  static readonly sessionSecret = assertEnv("SESSION_SECRET");
}

export default Environment;

// Check directory structure
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
