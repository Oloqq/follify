import urllib from "urllib";
import querystring from "query-string";
import log from "../logs";
import HTTP from "../HttpStatusCode"

interface UserProfile {
  id: string
}

export function getUserInfo(token: string): Promise<UserProfile> {
  return new Promise((resolve, reject) => {
    urllib.request("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token
      }
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
}

interface FollowedResponse {
  artists: {
    items: Artist[],
    cursors: {
      after: string
    }
    total: number
  }
}

async function getFollowingBatch(token: string, after: string | undefined, limit: number): Promise<FollowedResponse> {
  try {
    let result = await urllib.request("https://api.spotify.com/v1/me/following?"
      + querystring.stringify({
        type: "artist",
        after: after,
        limit: limit
      })
      , {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token
        }
      })

    if (result.res.statusCode != HTTP.OK) {
      let msg = `Couldn't get following: ${result.res.statusCode}`
      log.error(msg);
      throw new Error();
    }

    return JSON.parse(result.data.toString());
  }
  catch (err) {
    let msg = `Failed to get batch of followed: ${err}`;
    log.error(msg);
    throw err;
  };
}

export function getFollowing(token: string): Promise<Artist[]> {
  log.info(`Getting followed ${token}`);
  return new Promise(async (resolve, reject) => {
    let after: string | undefined = undefined;
    let limit = 50;
    let total = Infinity;
    let gathered = 0;
    let result: Artist[] = [];
    while (gathered < total) {
      await getFollowingBatch(token, after, limit)
        .then(response => {
          total = response.artists.total;
          after = response.artists.cursors.after;
          gathered += limit;
          for (let artist of response.artists.items) {
            result.push(artist);
          }
        })
        .catch(err => {
          log.error(err);
        });
    }
    resolve(result);
  })
}