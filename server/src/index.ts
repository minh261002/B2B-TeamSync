import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";
import { config } from "./configs/app.config";
import connectDatabase from "./configs/database.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import authRouter from "./routes/auth.routes";
import passport from "./configs/passport.config";

const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    name: "session",
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: config.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: config.FRONTEND_URL,
    credentials: true
  })
);

app.use(`${BASE_PATH}/auth`, authRouter);

app.use(errorHandler);

app.listen(config.PORT, async () => {
  console.log(`Server is running on http://localhost:${config.PORT}`);
  await connectDatabase();
});
