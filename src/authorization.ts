import authDB from "./database/authorization";
import { identifiedTokens, refreshToken } from "./spotify/authorization";
import log from "./logs";

export namespace authorizator {
  function isExpired(tokens: UserTokens): boolean {
    const now = new Date();
    const expired = tokens.expiry < now;
    if (expired) {
      log.info(`Tokens expired for ${tokens.userId} on ${new Date(tokens.expiry)}`);
    }
    // return expired;
    log.info(`expiry: ${tokens.expiry}, now: ${now}`);
    return false;
  }

  function refresh(tokens: UserTokens): Promise<UserTokens> {
    return new Promise((resolve, reject) => {
      refreshToken(tokens.refreshToken)
        .then(noIdTokens => {
          const newTokens = identifiedTokens(noIdTokens, tokens.userId);
          authDB.put(newTokens);
          resolve(newTokens);
        })
        .catch(err => {
          const msg = `Couldn't refresh token for ${tokens.userId}: ${err}`
          log.error(msg);
          reject(msg);
        })
    })
  }

  export function getToken(userId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      authDB.get(userId)
        .then(tokens => {console.log(tokens); return (isExpired(tokens) ? refresh(tokens) : tokens) })
        .then(tokens => {
          log.info(`Obtained token: ${tokens.toString()}`);
          console.log("Obtained token: ", tokens);
          resolve(tokens.accessToken);
        })
        .catch(err => {
          log.error(`Couldn't get token for ${userId}: ${err}`);
          reject(err);
        })
    });
  }
}

export default authorizator;