// to be removed
import { Express, Request, Response } from "express";
import express from "express";
import path from "path";
import "../sessionData";

export function initRoutes(app: Express) {
  const reactBuildDir = path.join(__dirname, "../views/build");

  app.use(express.static(reactBuildDir));

  const routeToReact = ["/", "/settings"];
  for (const route of routeToReact) {
    app.get(route, (req: Request, res: Response) => {
      res.sendFile(path.join(reactBuildDir, "index.html"));
    });
  }
}

export default initRoutes;