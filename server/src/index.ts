import "dotenv/config";
import express from "express";
import type {NextFunction, Request, Response} from "express";
import cors from "cors";
import session from "cookie-session";
import { config } from "~/configs/app.config";
import connectDatabase from "~/configs/database.config";
import { errorHandler } from "~/middlewares/errorHandler.middleware";

const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        name: "session",
        keys:[config.SESSION_SECRET],
        maxAge: 24 * 60 * 60 * 1000,
        secure: config.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
    })
)

app.use(cors({
    origin: config.FRONTEND_URL,
    credentials: true,
}));

app.use(`${BASE_PATH}`, (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello World");
});

app.use(errorHandler);

app.listen(config.PORT, async () => {
    console.log(`Server is running on http://localhost:${config.PORT}`);
    await connectDatabase();
});