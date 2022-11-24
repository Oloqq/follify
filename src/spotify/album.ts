import urllib from "urllib";
import log from "../logs";
import HTTP from "../HttpStatusCode"
import querystring from "query-string";

const limit = 50;

//TODO utilize get several albums endpoint

interface TracksResponse {
  items: Track[];
  next: string | null;
  total: number;
}

//TODO implement paging
export function getTracks(token: string, id: string): Promise<Track[]> {
  return urllib.request(`https://api.spotify.com/v1/albums/${id}/tracks?`
    + querystring.stringify({
      limit: limit
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

      let data: TracksResponse = JSON.parse(result.data.toString());
      return data.items;
    })
    .catch(err => {
      log.error(err);
      return [];
    });
}
