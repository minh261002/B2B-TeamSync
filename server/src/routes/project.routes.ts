import { Router } from "express";
import { createProjectController } from "../controllers/project.controller";

const projectRouter = Router();

projectRouter.post("/workspace/:workspaceId/create", createProjectController);

export default projectRouter;
