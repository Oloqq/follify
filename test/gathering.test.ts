import { expect } from "chai";
import { appendFromArtist } from "../src/gathering";
import authorizator from "../src/authorization";
import * as spotify from "../src/spotify/api";
import { DateSpan } from "../src/utils";
import cacheDB from "../src/database/caching";
import { dblog } from "../src/logs";
import log from "../src/logs";

const user = "11182739993";

const artistSubject: Artist = {
  id: "3yJnBqAoRUNeDabdYoiYWD",
  name: "Pink Guy"
}
const albumSubject = {
  name: "Pink Season",
  id: "3l5PdpQHvUOXlq1w9PftPu",
  release: "2017-01-04"
}

const albumPeriod = new DateSpan("2016-12-01", "2018-12-01");
const noAlbumPeriod = new DateSpan("2016-12-01", "2016-12-03");

describe("spotify/artist", () => {
  //TODO move to tests dedicated to spotify api
  it("fetches albums and filters", async () => {
    const token = await authorizator.getToken(user);
    let unfiltered = await spotify.artist.getAlbums(token, artistSubject.id, {limit: 1});
    expect(unfiltered.length).eq(1);
    let album = unfiltered[0];
    expect(album.name).eq(albumSubject.name);
    expect(album.id).eq(albumSubject.id);
    expect(album.release).eq(albumSubject.release);

    expect(albumPeriod.contains(album.release)).true;
    expect(noAlbumPeriod.contains(album.release)).false;
    let filteredWith = unfiltered.filter(album => albumPeriod.contains(album.release));
    let filteredWithout = unfiltered.filter(album => noAlbumPeriod.contains(album.release));

    expect(filteredWith.length).eq(1);
    expect(filteredWithout.length).eq(0);
  })
});

describe("js set", () => {
  it("keeps unique values", () => {
    let bruh = new Set<string>();
    bruh.add("dupa");
    expect(bruh).length(1);
    bruh.add("dupa");
    expect(bruh).length(1);

    let albums = new Set<Artist>();
    let a = {
      id: "a",
      name: "a"
    }
    let aa = {
      id: "a",
      name: "a"
    }
    albums.add(a);
    albums.add(aa);
    expect(albums).length(2); // => Albums are created separately so have different address and are considered unique
  })
})

describe("gathering", () => {
  it("expands album list", async () => {
    { // assumption: cache is disabled, because cache is not implemented as of writing this line
      let cachedTracks = await cacheDB.get(artistSubject, albumPeriod);
      expect(cachedTracks == undefined);
    }

    const token = await authorizator.getToken(user);
    let albums = new Map<string, Album>();
    let tracks = new Map<string, Track>();
    await appendFromArtist(artistSubject, token, albumPeriod, albums, tracks);

    expect(tracks.size).eq(0);
    expect(albums.size).eq(1);
    for (let [id, alb] of albums) {
      expect(id).eq(albumSubject.id);
      expect(alb.id).eq(albumSubject.id);
    }
  })

  it("does not gather duplicates of albums", async () => {
    { // assumption: cache is disabled, because cache is not implemented as of writing this line
      let cachedTracks = await cacheDB.get(artistSubject, albumPeriod);
      expect(cachedTracks == undefined);
    }

    const token = await authorizator.getToken(user);
    let albums = new Map<string, Album>();
    let tracks = new Map<string, Track>();
    // 1st
    await appendFromArtist(artistSubject, token, albumPeriod, albums, tracks);
    // 2nd
    await appendFromArtist(artistSubject, token, albumPeriod, albums, tracks);

    expect(tracks.size).eq(0);
    expect(albums.size).eq(1);
    for (let [id, alb] of albums) {
      expect(id).eq(albumSubject.id);
      expect(alb.id).eq(albumSubject.id);
    }
  })
});