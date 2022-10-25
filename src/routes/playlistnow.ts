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

    let user = req.session.userid;
    let name = "Follify created this!";
    let desc = "bruh";
    let token = req.session.tokenTemp;

    let track = "spotify:track:4cOdK2wGLETKBW3PvgPWqT";

    createPlaylist(user, name, desc, token)
    .then(id => {
      addTracksToPlaylist(id, [track], token);
    })
    .catch(err => {
      log.error(`During making a playlist: ${err}`);
    })

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

async function addTracksToPlaylist(playlist: string, tracks: string[], token: string) {
  let result = await urllib.request(`https://api.spotify.com/v1/playlists/${playlist}/tracks`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    data: {
      'uris': tracks
    }
  });

  if (result.res.statusCode != HTTP_CREATED) {
    log.error(`Couldn't add to playlist: ${result.res.statusCode}: ${result.data.toString()} playlist=${playlist} tracks=${tracks}`);
    throw new Error("bruh");
  }
}

export default initRoutes;