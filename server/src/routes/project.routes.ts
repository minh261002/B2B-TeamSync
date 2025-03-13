import { Router } from "express";
import {
  createProjectController,
  getAllProjectsController,
  getProjectByIdAndWorkspaceIdController,
  getProjectAnalyticsController
} from "../controllers/project.controller";

const projectRouter = Router();

projectRouter.post("/workspace/:workspaceId/create", createProjectController);

projectRouter.get("/workspace/:workspaceId/all", getAllProjectsController);
projectRouter.get("/:id/workspace/:workspaceId", getProjectByIdAndWorkspaceIdController);
projectRouter.get("/:id/workspace/:workspaceId/analytics", getProjectAnalyticsController);

export default projectRouter;
