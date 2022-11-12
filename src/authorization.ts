import authDB from "database/authorization";
import { refreshToken } from "spotify/authorization";

export namespace authorizator {
  export function getToken(userid: string): string {
    return "";
  }
}

export default authorizator;