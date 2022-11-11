import "express-session";

declare module "express-session" {
  export interface SessionData {
    userId: string;
    num: number; // tmp
    tokenTemp: string; // tmp
  }
}