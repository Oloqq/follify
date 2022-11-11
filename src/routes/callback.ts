import { Express, Request, Response } from "express";
import "../sessionData";
import log from "../logs";
import env from "../environment";
import { requestToken } from "../spotify/authorization";
import { getUserInfo } from "../spotify/users";
import AuthDB from "../database/authorization";

const authDB = new AuthDB("authorization");

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
      req.session.tokenTemp = tokens.accessToken; // TEMP
      if (!authDB.put({
        userId: profile.id,
        accessToken: tokens.accessToken,
        expiry: tokens.expiry,
        refreshToken: tokens.refreshToken
      })) {
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