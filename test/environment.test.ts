import { expect } from "chai";
import env from "../src/environment"
import express from "express";
import initRoutes from "../src/routes/setup"

describe("app initialization", () => {
  it("should set environment variables in dev environment", () => {
    expect(env).include.keys("clientId", "clientSecret", "callback", "nodeEnv", "port", "frontend", "sessionSecret");
  });

  it("should set up all routes, and no additional ones", () => {
    const app = express();
    initRoutes(app, env);
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

    let methods: { [key: string]: { [methodName: string]: boolean } } = {
      "/": { get: true },
      "/login": { get: true },
      "/inc": { get: true },
      "/dec": { get: true },
      "/callback": { get: true },
      "/testAPI": { get: true },
    }

    for (let route of routes) {
      expect(route.path in methods).eq(true, `extra route ${route.path}: ${route.methods}`);
      expect(route.methods).deep.eq(methods[route.path], `incorrect methods ${route.path}: ${route.methods}`);
      delete methods[route.path];
    }

    expect(Object.keys(methods).length).eq(0, `at least one route is not implemented: ${JSON.stringify(methods)}`);
  });
});