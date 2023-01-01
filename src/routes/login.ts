import { Express, Request, Response } from "express";
import querystring from "query-string";
import "../sessionData";
import log from "../logs";
import env from "../environment";

const scopes: string = [
  "user-follow-read",
  "playlist-modify-public",
  "playlist-modify-private"
].join(" ");

export function initRoutes(app: Express) {
  app.get("/login", (req: Request, res: Response) => {
    log.info("Login attempt");

    const link = "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: env.clientId,
        scope: scopes,
        redirect_uri: env.callback,
      });

    res.status(200).json({
      success: true,
      redirectUrl: link
    });
  });
}

export default initRoutes;