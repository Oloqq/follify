import env from "../environment";
import { Base64 } from "js-base64";
import urllib from "urllib";
import HTTP from "../HttpStatusCode"

function basicAuth(): string {
  return "Basic " + Base64.encode(env.clientId + ":" + env.clientSecret);
}

function expiryDate(expiresIn: number): Date {
  let expiry = new Date();
  expiry.setSeconds(expiry.getSeconds() + expiresIn);
  return expiry;
}

export function requestToken(code: string): Promise<SpotifyTokens> {
  return new Promise((resolve, reject) => {
    urllib.request("https://accounts.spotify.com/api/token", {
      method: "POST",
      data: {
        code: code,
        redirect_uri: env.callback,
        grant_type: "authorization_code"
      },
      headers: {
        "Authorization": basicAuth()
      }
    })
      .then((result) => {
        if (result.res.statusCode != HTTP.OK) {
          reject(result.res);
        }
        const response = JSON.parse(result.data.toString())

        resolve({
          accessToken: response.access_token,
          expiry: expiryDate(response.expires_in),
          refreshToken: response.refresh_token,
        });
      })
  })
}