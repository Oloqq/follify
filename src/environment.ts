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
  static readonly clientId: string = assertEnv("SPOTIFY_CLIENT_ID");
  static readonly clientSecret: string = assertEnv("SPOTIFY_CLIENT_SECRET");
  static readonly callback: string = assertEnv("CALLBACK");
  static readonly nodeEnv: string = assertEnv("NODE_ENV");
  static readonly port: string = assertEnv("PORT");
  static readonly frontend: string = assertEnv("FRONTEND");
  static readonly panel: string = assertEnv("PANEL");
  static readonly panelCallback: string = assertEnv("PANEL_CALLBACK");
  static readonly sessionSecret: string = assertEnv("SESSION_SECRET");
  static readonly errorPage: string = "https://www.youtube.com/watch?v=kpwNjdEPz7E";
}

export default Environment;
