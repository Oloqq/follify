import { Express, Request, Response } from "express";
import "../sessionData";
import log from "../logs";
import HTTP from "../HttpStatusCode"
import authorizator from "../authorization";
import { DateSpan, SpotiDate } from "../utils";
import { gatherTracks } from "../gathering";
import moment from "moment";

import * as spotify from "../spotify/api";
import { createPlaylist, addTracksToPlaylist, PlaylistOptions } from "../spotify/playlist";

const description = "Created by Follify!\nhttps://github.com/Oloqq/follify";

function extractPeriod(user: string, rq: any): DateSpan {
  if (rq.startDate && rq.startDate != "" && rq.endDate && rq.endDate != "") {
    return new DateSpan(rq.startDate, rq.endDate);
  }
  else {
    // TODO make database call for config
    log.warn("Defaulting period");
    const monthBack = moment().subtract(1, 'month');
    const now = moment();
    return new DateSpan(SpotiDate.fromMoment(monthBack), SpotiDate.fromMoment(now));
  }
}

function extractPlaylistMeta(rq: any, period: DateSpan): PlaylistOptions {
  return {
    name: typeof rq != "object" || !rq.name || rq.name == "" ? `Follify! ${period}` : rq.name,
    description: typeof rq != "object" ? rq.description : rq.description, //undefined is fine
    public: (typeof rq == "object" && rq.public && rq.public != "false") ? true : false, //ternary operator is necessary because javascript prefers evaluation to undefined instead of false
  };
}

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
    log.info(`Request for a playlist: period: ${period}, public: ${opts.public}, name: ${opts.name}, desc: ${opts.description}, rq: ${JSON.stringify(req.body)}`)
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