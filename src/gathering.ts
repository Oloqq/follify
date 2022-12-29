import log from "./logs";
import cacheDB from "./database/caching";
import { getFollowing } from "./spotify/user";
import * as spotify from "./spotify/api";
import { DateSpan } from "./utils";

export async function appendFromArtist(artist: Artist, token: string, period: DateSpan, albums: Album[], tracks: Track[]) {
  let cachedTracks = await cacheDB.get(artist, period);
  if (cachedTracks === undefined) {
    let unfiltered = await spotify.artist.getAlbums(token, artist.id, {limit: 1});
    let filtered = unfiltered.filter(album => period.contains(album.release));
    log.info(`For artist ${JSON.stringify(artist)} and period ${period} fetched albums: ${filtered}`);
    albums.push(...filtered);
  }
  else {
    tracks.push(...cachedTracks);
    log.info(`For artist ${artist.id} retrieved tracks from cache`);
  }
}

export function gatherTracks(token: string, period: DateSpan): Promise<Track[]> {
  return new Promise((resolve, reject) =>
  getFollowing(token)
  .then(async (following: Artist[]) => {
    let albums: Album[] = [];
    let tracksFromCache: Track[] = [];
    for (let followedArtist of following) {
      await appendFromArtist(followedArtist, token, period, albums, tracksFromCache);
    }
    return { albums, tracksFromCache };
  })
  .then(async ({ albums, tracksFromCache }) => {
    let tracks: Track[] = tracksFromCache;
    for (let album of albums) {
      tracks.push(...await spotify.album.getTracks(token, album.id));
    }
    resolve(tracks);
  })
  .catch((err) => {
    console.log(err);
  }))
}