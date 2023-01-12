import log from "./logs";
import cacheDB from "./database/caching";
import { getFollowing } from "./spotify/user";
import * as spotify from "./spotify/api";
import { DateSpan } from "./utils";

export async function appendFromArtist(artist: Artist, token: string, period: DateSpan, albums: Map<string, Album>, tracks: Map<string, Track>) {
  let cachedTracks = await cacheDB.get(artist, period);
  if (cachedTracks === undefined) {
    let unfiltered = await spotify.artist.getAlbums(token, artist.id, {limit: 10});
    let filtered = unfiltered.filter(album => period.contains(album.release));
    filtered.forEach(album => { albums.set(album.id, album) });

    log.info(`For artist ${artist.id} and period ${period} fetched ${unfiltered.length} albums, after filtering processing ${filtered.length} of them`);
  }
  else {
    cachedTracks.forEach(track => { tracks.set(track.id, track) });
    log.info(`For artist ${artist.id} retrieved tracks from cache`);
  }
}

/*
Returning a Map instead of Set,
because uniqueness of objects is based on their address,
so Set would only be valid for storing id's alone
*/
export function gatherTracks(token: string, period: DateSpan): Promise<Map<string, Track>> {
  return new Promise((resolve, reject) =>
  getFollowing(token)
  .then(async (following: Artist[]) => {
    let albums = new Map<string, Album>();
    let tracksFromCache = new Map<string, Track>();
    for (let followedArtist of following) {
      await appendFromArtist(followedArtist, token, period, albums, tracksFromCache);
    }
    return { albums, tracksFromCache };
  })
  .then(async ({ albums, tracksFromCache }) => {
    let tracks: Map<string, Track> = tracksFromCache;
    for (let [id, album] of albums) {
      (await spotify.album.getTracks(token, id))
      .forEach(track => {
        tracks.set(track.id, track);
      });
    }
    resolve(tracks);
  })
  .catch((err) => {
    console.log(err);
  }))
}