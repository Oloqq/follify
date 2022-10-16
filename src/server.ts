import "./environment";
import express from "express";
import session from "express-session";
import cors from "cors";
import initRoutes from "./routes/setup"

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
  console.log(`Follify back-end started on port ${process.env.PORT}`);
})