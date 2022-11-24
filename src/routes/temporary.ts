// to be removed
import { Express, Request, Response } from "express";
import "../sessionData";
import { getFollowing } from "../spotify/users";
import * as spotify from "../spotify/api";
import authorizator from "../authorization";

export function initRoutes(app: Express) {
  app.get("/", (req: Request, res: Response) => {
    res.sendFile(`${global.appRoot}/views/index.html`);
  })

  app.get("/artistsalbums", (req: Request, res: Response) => {
    if (req.session.userId === undefined) {
      res.send("login first");
      return;
    }

    authorizator.getToken(req.session.userId)
      .then(token => spotify.artist.getAlbums(token, "0gxyHStUsqpMadRV0Di1Qt"))
      .then((stuff: Album[]) => {
        let s = "";
        stuff.forEach(album => {
          s += album.name + "<br>";
        });
        res.send(s);
      })
      .catch((err) => {
        console.log(err);
      })
  })

  app.get("/following", (req: Request, res: Response) => {
    if (req.session.userId === undefined) {
      res.send("login first");
      return;
    }

    authorizator.getToken(req.session.userId)
      .then(token => getFollowing(token))
      .then((stuff: Artist[]) => {
        let s = "";
        stuff.forEach(artist => {
          s += artist.name + "<br>";
        });
        res.send(s);
      })
      .catch((err) => {
        console.log(err);
      })
  })

  app.get("/inc", (req: Request, res: Response) => {
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

  app.get("/dec", (req: Request, res: Response) => {
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

  app.get("/testAPI", (req: Request, res: Response) => {
    console.log(req.session);
    if (req.session && req.session.userId) {
      res.send("session: " + req.session.userId);
    }
    else {
      res.send("BRUH");
    }
    // res.send("BRUH");
  });
}

export default initRoutes;