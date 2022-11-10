import { Express, Request, Response } from "express";
import "../sessionData";
import log from "../logs";
import { createPlaylist, addTracksToPlaylist } from "../spotify/playlist";
import { gatherTracks } from "../spotify/tracks";

const description = "Follify created this!\nhttps://github.com/Oloqq/follify";

function newPlaylistName(): string {
  const now = new Date();
  return `"Follify created this!" ${now.toDateString()}`;
}

export function initRoutes(app: Express) {
  app.post("/playlistnow", async (req: Request, res: Response) => {
    log.info(`playlistnow ${req.session.userid}`);
    if (req.session.userid === undefined || req.session.tokenTemp === undefined) {
      res.send("login first");
      return;
    }

    let user = req.session.userid;
    let name = newPlaylistName();
    let token = req.session.tokenTemp;

    let tracks = gatherTracks();

    createPlaylist(user, name, description, token)
    .then(playlistId => {
      addTracksToPlaylist(playlistId, tracks, token);
    })
    .catch(err => {
      log.error(`During making a playlist: ${err}`);
    })

    res.send(201);
  });
}

export default initRoutes;