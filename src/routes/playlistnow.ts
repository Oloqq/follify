import { Express, Request, Response } from "express";
import { Base64 } from "js-base64";
import urllib from "urllib";
import "./sessionData";
import log from "../logs";
import ENV from "../environment";

const HTTP_OK = 200;
const HTTP_CREATED = 201;

export function initRoutes(app: Express) {
  app.post("/playlistnow", async (req: Request, res: Response) => {
    log.info(`playlistnow ${req.session.userid}`);
    if (req.session.userid === undefined || req.session.tokenTemp === undefined) {
      res.send("login first");
      return;
    }

    createPlaylist(req.session.userid, "temp", "aaa", req.session.tokenTemp);

    res.redirect("/");
  });
}

async function createPlaylist(userId: string, name: string, description: string, token: string) {
  log.info(`Creating playlist. user=${userId}, playlist name=${name}`);

  // token = token ? token : await getToken(userId);
  let result = await urllib.request(`https://api.spotify.com/v1/users/${userId}/playlists`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    data: {
      "name": name,
      "description": description,
      "public": false
    }
  });

  if (result.res.statusCode != HTTP_CREATED) {
    log.error(`Couldn't create playlist: ${result.res.statusCode}, ` +
      `user=${userId}, playlist name=${name}`)
    return;
  }

  var data = JSON.parse(result.data.toString());
  log.info(`${JSON.stringify(data)}`);
  return data.id;
}

export default initRoutes;