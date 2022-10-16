import { Express, Request, Response } from "express";
import querystring from "query-string";
import { Base64 } from "js-base64";
import urllib from "urllib";
import "./sessionData";
import log from "../logs";
import { RequestOptions } from "urllib/src/esm/Request";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const callback = process.env.CALLBACK;
const scopes = [
  "user-follow-read",
  "playlist-modify-public",
  "playlist-modify-private"
];
const HTTP_OK = 200;

function basicAuth(): string {
  return "Basic " + Base64.encode(clientId + ":" + clientSecret);
}

export function initRoutes(app: Express) {
  var scope = "";
  for (let s of scopes) {
    scope += s + " ";
  }

  app.get("/login", (req: Request, res: Response) => {
    log.info("Login attempt");

    res.redirect("https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: clientId,
        scope: scope,
        redirect_uri: callback,
      }));
  });

  app.get("/callback", (req: Request, res: Response) => {
    log.info("Received callback");
    if (typeof req.query.code !== "string") {
      log.error(`No code received in the callback, or code is not a string: ${req.query.code}`);
      return;
    }
    requestToken(req.query.code);

  });
}

function requestToken(code: string): Promise<string> {
  return new Promise((resolve, reject) => {
    urllib.request("https://accounts.spotify.com/api/token", {
      method: "POST",
      data: {
        code: code,
        redirect_uri: callback,
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

        var authData: AuthData = JSON.parse(result.data.toString());
        getUserInfo(authData.access_token)
        .then((profile: UserProfile) => {
          log.info(profile.id);
        })
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
        log.error("Failed to get spotify access token: ", err);
        reject(`Failed to get spotify access token: ${err}`)
      });
  })
}

function putUserInfo() {
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