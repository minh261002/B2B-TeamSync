import { Router } from "express";
import passport from "passport";
import { config } from "../configs/app.config";
import {
  googleLoginCallback,
  loginUserController,
  logoutUserController,
  registerUserController
} from "src/controllers/auth.controller";

const authRouter = Router();

const failUrl = `${config.GOOGLE_CALLBACK_URL}?status=fail`;

authRouter.post("/register", registerUserController);
authRouter.post("/login", loginUserController);
authRouter.post("/logout", logoutUserController);
authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
authRouter.get("/google/callback", passport.authenticate("google", { failureRedirect: failUrl }), googleLoginCallback);

export default authRouter;
