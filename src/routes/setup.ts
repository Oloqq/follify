import { Express } from "express";
import { Environment} from "environment"
import "../sessionData";

import diagnostics from "./diagnostics";
import login from "./login";
import callback from "./callback";
import playlistnow from "./playlistnow";
import client from "./client";

export function initRoutes(app: Express, env: Environment) {
  diagnostics(app);
  login(app);
  callback(app);
  playlistnow(app);
  client(app);
}

export default initRoutes;