import { Express, Request, Response } from "express";
import "../sessionData";
import log from "../logs";
import HTTP from "../HttpStatusCode"
import authorizator from "../authorization";
import { DateSpan } from "../utils";
import { gatherTracks } from "../gathering";

import * as spotify from "../spotify/api";
import { createPlaylist, addTracksToPlaylist } from "../spotify/playlist";

const description = "Created by Follify!\nhttps://github.com/Oloqq/follify";

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
    let trackIds: string[];
    const period = new DateSpan("2022-12-01", "2023-03-01");

    authorizator.getToken(user)
    .then(token_ => { token = token_ })
    .then(() => gatherTracks(token, period))
    .then(tracks => { trackIds = spotify.track.extractPrefixedIds(tracks) })
    .then(() => createPlaylist(user, name, description, token))
    .then(playlistId => {
      addTracksToPlaylist(playlistId, trackIds, token);
      res.sendStatus(HTTP.CREATED);
    })
    .catch(err => {
      log.error(`During making a playlist: ${err}`);
    })
  });
}

export default initRoutes;