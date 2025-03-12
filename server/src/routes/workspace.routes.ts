import { Router } from "express";
import {
  createWorkspaceController,
  getAllWorkspaceUserIsMemberOfController,
  getWorkspaceByIdController,
  getMembersByWorkspaceIdController,
  getWorkspaceAnalyticsController
} from "src/controllers/workspace.controller";

const workspaceRouter = Router();

workspaceRouter.post("/create/new", createWorkspaceController);
workspaceRouter.get("/all", getAllWorkspaceUserIsMemberOfController);
workspaceRouter.get("/:id", getWorkspaceByIdController);
workspaceRouter.get("/:id/members", getMembersByWorkspaceIdController);
workspaceRouter.get("/:id/analytics", getWorkspaceAnalyticsController);

export default workspaceRouter;
