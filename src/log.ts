import { Logger } from "../types/log";

var fs = require('fs');
var dir = './logs';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

import simpleNodeLogger from 'simple-node-logger';
const logger: Logger = simpleNodeLogger.createSimpleLogger('logs/basic.log');
export default logger;
