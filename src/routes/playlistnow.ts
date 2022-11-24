import { Express, Request, Response } from "express";
import "../sessionData";
import log from "../logs";
import HTTP from "../HttpStatusCode"
import authorizator from "../authorization";

import * as spotify from "../spotify/api";
import { createPlaylist, addTracksToPlaylist } from "../spotify/playlist";
import { getFollowing } from "../spotify/user";

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
    let trackIds: string[];

    authorizator.getToken(user)
    .then(token_ => { token = token_ })
    .then(() => gatherTracks(token))
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

function gatherTracks(token: string): Promise<Track[]> {
  return new Promise((resolve, reject) => getFollowing(token)
  .then(async (following) => {
    let albums: Album[] = [];
    for (let followedArtist of following) {
      albums.push(...await spotify.artist.getAlbums(token, followedArtist.id, {limit: 1}));
    }
    return albums;
  })
  .then(async (albums: Album[]) => {
    let tracks: Track[] = [];
    for (let album of albums) {
      tracks.push(...await spotify.album.getTracks(token, album.id));
    }
    resolve(tracks);
  })
  .catch((err) => {
    console.log(err);
  }))
}

export default initRoutes;