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
    .then(tracks => { trackIds = spotify.track.extractIds(tracks) })
    .then(() => createPlaylist(user, name, description, token))
    .then(playlistId => {
      addTracksToPlaylist(playlistId, trackIds, token);
    })
    .catch(err => {
      log.error(`During making a playlist: ${err}`);
    })

    res.sendStatus(HTTP.CREATED);
  });
}

function gatherTracks(token: string): Promise<Track[]> {
  return new Promise((resolve, reject) => getFollowing(token)
  .then((following) => {
    let albums: Album[] = [];
    following.forEach(async (followedArtist) => {
      albums.push(...await spotify.artist.getAlbums(token, followedArtist.id, {limit: 1}));
    });
    return albums;
  })
  .then((albums: Album[]) => {
    let tracks: Track[] = [];
    albums.forEach(async (album) => {
      // tracks.push(...await spalbums.)
    })

    tracks.push({ //TEMP
      id: "spotify:track:4cOdK2wGLETKBW3PvgPWqT",
      name: "tmp"
    })

    resolve(tracks);
  })
  .catch((err) => {
    console.log(err);
  }))
}

export default initRoutes;