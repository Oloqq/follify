import env from "./environment";
import express from "express";
import { Request, Response } from "express";
import session from "cookie-session";
import cors from "cors";
import path from "path"
import initRoutes from "./routes/setup"
import log from "./logs"

global.appRoot = path.resolve(__dirname);

const app = express();
app.use(cors({credentials: true, origin: env.frontend}));
app.use(session({
  secret: env.sessionSecret || process.exit(1)
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app, env);

const reactBuildDir = path.join(__dirname, "views/build");
app.use(express.static(reactBuildDir));
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(reactBuildDir, "index.html"));
});

app.listen(env.port, () => {
  log.info(`Follify back-end started on port ${env.port}`);
})