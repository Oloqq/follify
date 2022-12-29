import urllib from "urllib";
import querystring from "query-string";
import log from "../logs";
import HTTP from "../HttpStatusCode"

interface AlbumsResponse {
  items: {
    id: string,
    name: string,
    release_date: string
  }[];
  next: string | null;
  total: number;
}

export class GetAlbumPref {
  includeGroups?: string = "album,single"
  limit?: number = 50 // max = 50
}

//TODO implement paging just in case, and to save transfer on fist call
//TODO change id: string to artist: Artist|string
export function getAlbums(token: string, id: string, pref = new GetAlbumPref()): Promise<Album[]> {
  return urllib.request(`https://api.spotify.com/v1/artists/${id}/albums?`
    + querystring.stringify({
      // TODO handle appears_on (see bottom of the file)
      include_groups: pref.includeGroups,
      limit: pref.limit
    })
    , {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token
      }
    })
    .then(result => {
      if (result.res.statusCode != HTTP.OK) {
        let msg = `Couldn't get artists's albums: ${result.res.statusCode}`
        log.error(msg);
        throw new Error();
      }

      let data: AlbumsResponse = JSON.parse(result.data.toString());
      return data.items.map(item => {
        return {
          id: item.id,
          name: item.name,
          release: item.release_date
        }
      });
    })
    .catch(err => {
      log.error(err);
      return [];
    });
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