import { Router } from "express";
import { createProjectController, getAllProjectsController } from "../controllers/project.controller";

const projectRouter = Router();

projectRouter.post("/workspace/:workspaceId/create", createProjectController);

projectRouter.get("/workspace/:workspaceId/all", getAllProjectsController);

export default projectRouter;
