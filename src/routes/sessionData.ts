import "express-session";

declare module "express-session" {
  export interface SessionData {
    userid: string;
    num: number; // tmp
    tokenTemp: string; // tmp
  }
}