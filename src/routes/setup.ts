import { Express } from "express";
import { Environment} from "environment"
import "../sessionData";

import temporary from "./temporary";
import login from "./login";
import callback from "./callback";
import playlistnow from "./playlistnow";

export function initRoutes(app: Express, env: Environment) {
  temporary(app);
  login(app);
  callback(app);
  playlistnow(app);
}

export default initRoutes;