import { Router } from "express";
import {
  createProjectController,
  getAllProjectsController,
  getProjectByIdAndWorkspaceIdController,
  getProjectAnalyticsController,
  updateProjectController,
  deleteProjectController
} from "../controllers/project.controller";

const projectRouter = Router();

projectRouter.post("/workspace/:workspaceId/create", createProjectController);

projectRouter.get("/workspace/:workspaceId/all", getAllProjectsController);
projectRouter.get("/:id/workspace/:workspaceId", getProjectByIdAndWorkspaceIdController);
projectRouter.get("/:id/workspace/:workspaceId/analytics", getProjectAnalyticsController);

projectRouter.put("/:id/workspace/:workspaceId/update", updateProjectController);

projectRouter.delete("/:id/workspace/:workspaceId/delete", deleteProjectController);
export default projectRouter;
