import { Express, Request, Response } from "express";
import temporary from "./temporary";
import login from "./login";
import "./sessionData";

export function initRoutes(app: Express) {
  temporary(app);
  login(app);
}

export default initRoutes;