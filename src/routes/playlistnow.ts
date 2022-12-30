import { Express, Request, Response } from "express";
import "../sessionData";
import log from "../logs";
import HTTP from "../HttpStatusCode"
import authorizator from "../authorization";
import { DateSpan } from "../utils";
import { gatherTracks } from "../gathering";

import * as spotify from "../spotify/api";
import { createPlaylist, addTracksToPlaylist, PlaylistOptions } from "../spotify/playlist";

const description = "Created by Follify!\nhttps://github.com/Oloqq/follify";

function extractPeriod(user: string, rq: any): DateSpan {
  if (rq.startDate && rq.startDate != "" && rq.endDate && rq.endDate != "") {
    return new DateSpan(rq.startDate, rq.endDate);
  }
  else {
    // TODO make database call for config
    throw new Error("No period given");
  }
}

function extractPlaylistMeta(rq: any, period: DateSpan): PlaylistOptions {
  return {
    name: !rq || rq.name == "" ? `Follify! ${period}` : rq.name,
    description: rq.description, //undefined is fine
    public: (rq.public && rq.public != "false") ? true : false,
  };
}

//FIXME need thorough testing
function gatherConfig(user: string, rq: any): [DateSpan, PlaylistOptions] {
  let period = extractPeriod(user, rq);
  return [period, extractPlaylistMeta(rq, period)];
}

export function initRoutes(app: Express) {
  app.post("/playlistnow", async (req: Request, res: Response) => {
    log.info(`Playlistnow for user ${req.session.userId}`);
    if (req.session.userId === undefined) {
      res.send("login first");
      return;
    }

    let user = req.session.userId;
    let period: DateSpan
    let opts: PlaylistOptions;
    try {
      [period, opts] = gatherConfig(user, req.body);
    }
    catch (e) {
      res.sendStatus(HTTP.BAD_REQUEST);
      return;
    }

    let token: string;
    let trackIds: string[];

    authorizator.getToken(user)
    .then(token_ => { token = token_ })
    .then(() => gatherTracks(token, period))
    .then(tracks => { trackIds = spotify.track.extractPrefixedIds(tracks) })
    .then(() => createPlaylist(user, token, opts))
    .then(playlistId => {
      addTracksToPlaylist(playlistId, trackIds, token);
      res.sendStatus(HTTP.CREATED);
    })
    .catch(err => {
      log.error(`During making a playlist: ${err}`);
      res.sendStatus(HTTP.BAD_REQUEST); // even if it's our own fault, we're gonna gaslight the user. Promote non-toxic software!
    })
  });
}

export default initRoutes;