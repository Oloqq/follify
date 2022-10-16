import { Express, Request, Response } from "express";
import { Environment} from "environment"
import "./sessionData";

import temporary from "./temporary";
import login from "./login";
import callback from "./callback";

export function initRoutes(app: Express, env: Environment) {
  temporary(app);
  login(app);
  callback(app);
}

export default initRoutes;