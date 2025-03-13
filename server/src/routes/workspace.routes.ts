import { Router } from "express";
import {
  createWorkspaceController,
  getAllWorkspaceUserIsMemberOfController,
  getWorkspaceByIdController,
  getMembersByWorkspaceIdController,
  getWorkspaceAnalyticsController,
  changeMemberRoleInWorkspaceController
} from "src/controllers/workspace.controller";

const workspaceRouter = Router();

workspaceRouter.post("/create/new", createWorkspaceController);
workspaceRouter.get("/all", getAllWorkspaceUserIsMemberOfController);
workspaceRouter.get("/:id", getWorkspaceByIdController);
workspaceRouter.get("/:id/members", getMembersByWorkspaceIdController);
workspaceRouter.get("/:id/analytics", getWorkspaceAnalyticsController);
workspaceRouter.get("/:id/change/member/role", changeMemberRoleInWorkspaceController);
export default workspaceRouter;
