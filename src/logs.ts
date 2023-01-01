import { Logger } from "../types/log";
import simpleNodeLogger from 'simple-node-logger';

function loggerByEnv(logname: string): Logger {
  if (process.env.NODE_ENV === "test") {
    return simpleNodeLogger.createSimpleFileLogger(`logs/test/${logname}.log`);
  }
  else {
    return simpleNodeLogger.createSimpleLogger(`logs/${logname}.log`);
  }
}


export const logger: Logger = loggerByEnv("basic");
export const authlog: Logger  = loggerByEnv("db_auth");
export const cachelog: Logger  = loggerByEnv("db_cache");
export const configlog: Logger  = loggerByEnv("db_config");

export default logger;
