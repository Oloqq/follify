if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

import express, { Request, Response } from "express";
import session from "express-session";
import "./sessionData";
import cors from "cors";

const app = express();
app.use(cors()); // needed with React https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
app.use(session({
  // secret: process.env.SESSION_SECRET,
  secret: "temp",
  saveUninitialized: true,
  resave: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    console.log(req.session);
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

app.get("/login", (req: Request, res: Response)=> {
  console.log("login attempt");
  res.redirect("/callback");
});

app.get("/callback", (req: Request, res: Response)=> {
  console.log("login attempt");
  req.session.userid = "69";
  res.redirect("http://localhost:3000");
});

// TODO check if port defined
var listener = app.listen(process.env.PORT, () => {
  console.log("started");
})