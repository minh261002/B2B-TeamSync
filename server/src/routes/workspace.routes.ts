import { Router } from "express";
import {
  createWorkspaceController,
  getAllWorkspaceUserIsMemberOfController,
  getWorkspaceByIdController,
  getMembersByWorkspaceIdController,
  getWorkspaceAnalyticsController,
  changeMemberRoleInWorkspaceController,
  updateWorkspaceByIdController
} from "src/controllers/workspace.controller";

const workspaceRouter = Router();

workspaceRouter.post("/create/new", createWorkspaceController);
workspaceRouter.get("/all", getAllWorkspaceUserIsMemberOfController);
workspaceRouter.get("/:id", getWorkspaceByIdController);
workspaceRouter.get("/:id/members", getMembersByWorkspaceIdController);
workspaceRouter.get("/:id/analytics", getWorkspaceAnalyticsController);
workspaceRouter.put("/:id/change/member/role", changeMemberRoleInWorkspaceController);
workspaceRouter.put("/:id/update", updateWorkspaceByIdController);
export default workspaceRouter;
