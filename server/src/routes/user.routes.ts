import { Router } from "express";
import { getCurrentUserController } from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/current", getCurrentUserController);

export default userRouter;
