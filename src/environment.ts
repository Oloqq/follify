import "./verifyFilesystem";
import log from "./logs"

if (process.env.NODE_ENV !== "production") { // PROD should have those set in the environment already
  require("dotenv").config();
}

function assertEnv(variable: string): string {
  if (process.env[variable] === undefined) {
    log.error(`FATAL: environment variable ${variable} is not set`);
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
  static readonly panel = assertEnv("PANEL");
  static readonly panelCallback = assertEnv("PANEL_CALLBACK");
  static readonly sessionSecret = assertEnv("SESSION_SECRET");
  static readonly errorPage = "https://www.youtube.com/watch?v=kpwNjdEPz7E";
}

export default Environment;
