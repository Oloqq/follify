import { Express, Request, Response } from "express";
import "./sessionData";

export function initRoutes(app: Express) {
  app.get("/inc", (req: Request, res: Response)=> {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    if (req.session.num == undefined) {
      req.session.num = 1;
      res.send(req.session.num + "");
    }
    else {
      req.session.num += 1;
      res.send(req.session.num + "");
    }
  });

  app.get("/dec", (req: Request, res: Response)=> {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    if (req.session.num == undefined) {
      req.session.num = 0;
      res.send(req.session.num + "");
    }
    else {
      req.session.num -= 1;
      res.send(req.session.num + "");
    }
  });

  app.get("/testAPI", (req: Request, res: Response)=> {
    console.log(req.session);
    if (req.session && req.session.userid) {
      res.send("session: " + req.session.userid);
    }
    else {
      res.send("BRUH");
    }
    // res.send("BRUH");
  });
}

export default initRoutes;