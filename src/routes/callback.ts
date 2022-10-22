import { Express, Request, Response } from "express";
import { Base64 } from "js-base64";
import urllib from "urllib";
import "./sessionData";
import log from "../logs";
import ENV from "../environment";

const HTTP_OK = 200;

function basicAuth(): string {
  return "Basic " + Base64.encode(ENV.clientId + ":" + ENV.clientSecret);
}

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
      res.redirect("/");
    })
    .catch(err => {
      log.error(`Callback failed ${err}`);
      //TODO res.redirect("500 error page")
      res.redirect("https://www.youtube.com/watch?v=kpwNjdEPz7E");
    })
  });
}

function requestToken(code: string): Promise<AuthData> {
  return new Promise((resolve, reject) => {
    urllib.request("https://accounts.spotify.com/api/token", {
      method: "POST",
      data: {
        code: code,
        redirect_uri: ENV.callback,
        grant_type: "authorization_code"
      },
      headers: {
        "Authorization": basicAuth()
      }
    })
      .then((result) => {
        if (result.res.statusCode != HTTP_OK) {
          reject(result.res);
        }

        resolve(JSON.parse(result.data.toString()));
      })
  })
}

function getUserInfo(token: string): Promise<UserProfile> {
  return new Promise((resolve, reject) => {
    urllib.request("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token
      }
    })
      .then((result) => {
        resolve(JSON.parse(result.data.toString()));
      })
      .catch(err => {
        let msg = `Failed to get spotify access token: ${err}`;
        log.error(msg);
        reject(msg)
      });
  })
}

function saveUserInfo(profile: UserProfile, authData: AuthData) {
  log.info(`"saving" user info ${profile.id}, ${authData.access_token}`);
  //   let profile = JSON.parse(result.data.toString());
  //   putUser(profile.id, authData.access_token, authData.expires_in, authData.refresh_token);
  //   // db.putUser(profile.id, authData.access_token, expiry.toUTCString(), authData.refresh_token);
  //   req.session.userid = profile.id;
  //   res.redirect("/");
  // })
  //   .catch (err => {
  //   log.error("Failed to get spotify profile: ", err);
  // });
}

export default initRoutes;