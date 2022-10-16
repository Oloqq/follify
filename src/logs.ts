import { Logger } from "../types/log";
import simpleNodeLogger from 'simple-node-logger';

export const logger: Logger = simpleNodeLogger.createSimpleLogger('logs/basic.log');
export const dblog : Logger = simpleNodeLogger.createSimpleLogger('logs/db.log');

export default logger;
