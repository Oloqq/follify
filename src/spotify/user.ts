import urllib from "urllib";
import log from "../logs";

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