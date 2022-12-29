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


export const logger: Logger = loggerByEnv("logs/basic.log");
export const dblog: Logger  = loggerByEnv("logs/db.log");

export default logger;
