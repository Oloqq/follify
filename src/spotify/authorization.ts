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

type TokenRqData = {
  grant_type: string,
  code: string,
  redirect_uri: string,
} | {
  grant_type: string,
  refresh_token: string,
}

function askForToken(data: TokenRqData): Promise<SpotifyTokens> {
  return new Promise((resolve, reject) => {
    urllib.request("https://accounts.spotify.com/api/token", {
      method: "POST",
      data: data,
      headers: {
        "Authorization": basicAuth()
      }
    })
      .then((result) => {
        if (result.res.statusCode !== HTTP.OK) {
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

export function requestToken(code: string, callback: string = env.callback): Promise<SpotifyTokens> {
  return askForToken({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: callback,
  })
}

export function refreshToken(refrToken: string): Promise<SpotifyTokens> {
  return askForToken({
    grant_type: "refresh_token",
    refresh_token: refrToken,
  });
}

export function identifiedTokens(tokens: SpotifyTokens, userId: string): UserTokens {
  return {
    userId: userId,
    accessToken: tokens.accessToken,
    expiry: tokens.expiry,
    refreshToken: tokens.refreshToken
  }
}