import { Express, Request, Response } from "express";
import "./sessionData";
import log from "../logs";
import { createPlaylist, addTracksToPlaylist } from "../spotify/playlist";
import { gatherTracks } from "../spotify/tracks";

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

    let tracks = gatherTracks();

    createPlaylist(user, name, desc, token)
    .then(playlistId => {
      addTracksToPlaylist(playlistId, tracks, token);
    })
    .catch(err => {
      log.error(`During making a playlist: ${err}`);
    })

    res.redirect("/");
  });
}

export default initRoutes;