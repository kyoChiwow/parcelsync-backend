import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import expressSession from "express-session";
import { envVars } from "./app/config/env";

const app = express();
app.set("trust proxy", 1);

app.use(
  cors({
    origin: envVars.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  expressSession({ secret: "secret", resave: false, saveUninitialized: false }),
);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to Parcelsync Parcel Manamgement System!",
    })
})

export default app;
