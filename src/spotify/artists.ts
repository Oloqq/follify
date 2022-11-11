import urllib from "urllib";
import querystring from "query-string";
import log from "../logs";
import HTTP from "../HttpStatusCode"

export namespace artist {
  interface AlbumsResponse {
    items: Album[];
    next: string|null;
    total: number;
  }

  //TODO implement paging just in case, and to save transfer on fist call
  export function getAlbums(token: string, id: string): Promise<Album[]> {
    return urllib.request(`https://api.spotify.com/v1/artists/${id}/albums?`
    + querystring.stringify({
      // TODO handle appears_on (see bottom of the file)
      include_groups: "album,single",
      limit: 50
    })
    , {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token
      }
    })
    .then(result => {
      if (result.res.statusCode != HTTP.OK) {
        let msg = `Couldn't get album's tracks: ${result.res.statusCode}`
        log.error(msg);
        throw new Error();
      }

      let data: AlbumsResponse = JSON.parse(result.data.toString());
      return data.items;
    })
    .catch(err => {
      log.error(err);
      return [];
    });
  }
}

/* NOTE
  handle appears_on
user follows B
A released an album. one song is featuring B
follify can't just add that one album to "track gathering queue" because a lot of songs are not interesting to the user
follify needs to filter just that one song

    })
      .then((result) => {
        resolve(JSON.parse(result.data.toString()));
      })
      .catch(err => {
        let msg = `Failed to get spotify access token: ${err}`;
        log.error(msg);
        reject(msg)
      });
  })
*/