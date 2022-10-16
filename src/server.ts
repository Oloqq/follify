import "./environment";
import express from "express";
import session from "express-session";
import cors from "cors";
import initRoutes from "./routes/setup"
import log from "./log"

const app = express();
app.use(cors());
app.use(session({
  secret: process.env.SESSION_SECRET || process.exit(1),
  saveUninitialized: true,
  resave: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);

app.listen(process.env.PORT, () => {
  log.info(`Follify back-end started on port ${process.env.PORT}`);
})