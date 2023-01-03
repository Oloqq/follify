import { Express, Request, Response } from "express";
import "../sessionData";
import log from "../logs";
import env from "../environment";
import { identifiedTokens, requestToken } from "../spotify/authorization";
import { getUserInfo } from "../spotify/user";
import authDB from "../database/authorization";

function handleCallback(req: Request, res: Response, successPage: string, callingEndpoint: string) {
  log.info("Received callback");
  if (typeof req.query.code !== "string") {
    log.error(`No code received in the callback, or code is not a string: ${req.query.code}`);
    return;
  }

  let tokens: SpotifyTokens;
  requestToken(req.query.code, callingEndpoint)
  .then(tokens_ => {
    tokens = tokens_;
    return getUserInfo(tokens.accessToken);
  })
  .then(profile => {
    req.session.userId = profile.id;
    if (!authDB.put(identifiedTokens(tokens, profile.id))) {
      throw new Error(`Couldn't put new user in database ${profile.id}`);
    }
    res.redirect(successPage);
  })
  .catch(err => {
    log.error(`Callback failed ${JSON.stringify(err)}`);
    res.redirect(env.errorPage);
  })
}

export function initRoutes(app: Express) {
  app.get("/panelcallback", async (req: Request, res: Response) => handleCallback(req, res, env.panel, env.panelCallback));

  app.get("/callback", async (req: Request, res: Response) => handleCallback(req, res, env.frontend, env.callback));
}

export default initRoutes;