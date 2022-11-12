import { Express, Request, Response } from "express";
import "../sessionData";
import log from "../logs";
import env from "../environment";
import { identifiedTokens, requestToken } from "../spotify/authorization";
import { getUserInfo } from "../spotify/users";
import authDB from "../database/authorization";

export function initRoutes(app: Express) {
  app.get("/callback", async (req: Request, res: Response) => {
    log.info("Received callback");
    if (typeof req.query.code !== "string") {
      log.error(`No code received in the callback, or code is not a string: ${req.query.code}`);
      return;
    }

    let tokens: SpotifyTokens;
    requestToken(req.query.code)
    .then(tokens_ => {
      tokens = tokens_;
      return getUserInfo(tokens.accessToken);
    })
    .then(profile => {
      req.session.userId = profile.id;
      if (!authDB.put(identifiedTokens(tokens, profile.id))) {
        throw new Error();
      }
      res.redirect(env.frontend);
    })
    .catch(err => {
      log.error(`Callback failed ${err}`);
      res.redirect(env.errorPage);
    })
  });
}

export default initRoutes;