import { Express, Request, Response } from "express";
import "../sessionData";
import log from "../logs";
import { createPlaylist, addTracksToPlaylist } from "../spotify/playlists";
import { gatherTracks } from "../spotify/tracks";
import authorizator from "../authorization";
import HTTP from "../HttpStatusCode"

const description = "Follify created this!\nhttps://github.com/Oloqq/follify";

function newPlaylistName(): string {
  const now = new Date();
  return `Follify created this! ${now.toDateString()}`;
}

export function initRoutes(app: Express) {
  app.post("/playlistnow", async (req: Request, res: Response) => {
    log.info(`playlistnow ${req.session.userId}`);
    if (req.session.userId === undefined) {
      res.send("login first");
      return;
    }

    let user = req.session.userId;
    let name = newPlaylistName();
    let token: string;

    let tracks = gatherTracks();
    authorizator.getToken(user)
    .then(token_ => {
      token = token_;
      return createPlaylist(user, name, description, token)
    })
    .then(playlistId => {
      addTracksToPlaylist(playlistId, tracks, token);
    })
    .catch(err => {
      log.error(`During making a playlist: ${err}`);
    })

    res.sendStatus(HTTP.CREATED);
  });
}

export default initRoutes;