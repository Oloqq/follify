import env from "./environment";
import express from "express";
import session from "express-session";
import cors from "cors";
import path from "path"
import initRoutes from "./routes/setup"
import log from "./logs"

global.appRoot = path.resolve(__dirname);

const app = express();
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(session({
  secret: env.sessionSecret || process.exit(1),
  saveUninitialized: true,
  resave: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app, env);

app.listen(env.port, () => {
  log.info(`Follify back-end started on port ${env.port}`);
})