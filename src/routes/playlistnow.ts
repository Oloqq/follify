import { Express, Request, Response } from "express";
import { Base64 } from "js-base64";
import urllib from "urllib";
import "./sessionData";
import log from "../logs";
import ENV from "../environment";

const HTTP_OK = 200;

export function initRoutes(app: Express) {
  app.post("/playlistnow", async (req: Request, res: Response) => {
    log.info(`playlistnow ${req.session.userid}`);
    res.redirect("/");
  });
}

export default initRoutes;