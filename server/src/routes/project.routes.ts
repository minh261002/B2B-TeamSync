import { Router } from "express";
import {
  createProjectController,
  getAllProjectsController,
  getProjectByIdAndWorkspaceIdController
} from "../controllers/project.controller";

const projectRouter = Router();

projectRouter.post("/workspace/:workspaceId/create", createProjectController);

projectRouter.get("/workspace/:workspaceId/all", getAllProjectsController);
projectRouter.get("/:id/workspace/:workspaceId", getProjectByIdAndWorkspaceIdController);

export default projectRouter;
