import { Express, Request, Response } from "express";
import temporary from "./temporary";
import "./sessionData";

export function initRoutes(app: Express) {
  app.get("/login", (req: Request, res: Response)=> {
    console.log("login attempt");
    res.redirect("/callback");
  });

  app.get("/callback", (req: Request, res: Response)=> {
    console.log("login attempt");
    req.session.userid = "69";
    res.redirect("http://localhost:3000");
  });

  temporary(app);
}

export default initRoutes;