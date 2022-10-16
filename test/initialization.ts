import { expect } from "chai";
import "../src/environment"
import express from "express";
import initRoutes from "../src/routes/setup"

describe("initialization", () => {
  it("should set environment variables in dev environment", () => {
    if (process.env.NODE_ENV !== "production") {
      for (var name of [
        "NODE_ENV",
        "PORT",
        "SPOTIFY_CLIENT_ID",
        "SPOTIFY_CLIENT_SECRET",
        "CALLBACK",
        "FRONTEND",
        "SESSION_SECRET",
      ]) {
        expect(process.env[name]!).to.be.a("string");
      }
    }
  });

  it("should set up all routes, and no additional ones", () => {
    const app = express();
    initRoutes(app);
    var route: any;
    var routes: any[] = [];

    app._router.stack.forEach(function (middleware: any) {
      if (middleware.route) { // routes registered directly on the app
        routes.push(middleware.route);
      } else if (middleware.name === 'router') { // router middleware
        middleware.handle.stack.forEach(function (handler: any) {
          route = handler.route;
          route && routes.push(route);
        });
      }
    });

    let methods: { [key: string] : { [methodName: string] : boolean}} = {
      "/login": {get: true},
      "/inc": {get: true},
      "/dec": {get: true},
      //TODO: API still has to be defined
    }

    for (let key in methods) {
      let path = routes.find((route) => {
        return route.path === key;
      })
      expect(path, `unexpected route: ${key}`).not.to.be.undefined;
      expect(path.methods).to.be.deep.eq(methods[key]);
    }

  });

});