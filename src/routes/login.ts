import { Express, Request, Response } from "express";
import querystring from "query-string";
import { Base64 } from "js-base64";
import urllib from "urllib";
import "./sessionData";
import log from "../logs";
import ENV from "../environment";

const scopes: string = [
  "user-follow-read",
  "playlist-modify-public",
  "playlist-modify-private"
].join(" ");

export function initRoutes(app: Express) {
  app.get("/login", (req: Request, res: Response) => {
    log.info("Login attempt");

    res.redirect("https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: ENV.clientId,
        scope: scopes,
        redirect_uri: ENV.callback,
      }));
  });
}

export default initRoutes;