import { Express, Request, Response } from "express";
import "./sessionData";
import log from "../logs";
import env from "../environment";
import { requestToken } from "../spotify/authorization";
import { getUserInfo } from "../spotify/user";
import { saveUserInfo } from "../database/user";

export function initRoutes(app: Express) {
  app.get("/callback", async (req: Request, res: Response) => {
    log.info("Received callback");
    if (typeof req.query.code !== "string") {
      log.error(`No code received in the callback, or code is not a string: ${req.query.code}`);
      return;
    }

    var authData: AuthData;
    requestToken(req.query.code)
    .then(data => {
      authData = data;
      return getUserInfo(authData.access_token)
    })
    .then(profile => {
      req.session.userid = profile.id;
      req.session.tokenTemp = authData.access_token;
      saveUserInfo(profile, authData);
      res.redirect(env.callback);
    })
    .catch(err => {
      log.error(`Callback failed ${err}`);
      res.redirect(env.errorPage);
    })
  });
}

export default initRoutes;