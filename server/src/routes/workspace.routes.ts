import { Router } from "express";
import {
  createWorkspaceController,
  getAllWorkspaceUserIsMemberOfController,
  getWorkspaceByIdController,
  getMembersByWorkspaceIdController,
  getWorkspaceAnalyticsController,
  changeMemberRoleInWorkspaceController,
  updateWorkspaceByIdController,
  deleteWorkspaceByIdController
} from "src/controllers/workspace.controller";

const workspaceRouter = Router();

workspaceRouter.post("/create/new", createWorkspaceController);

workspaceRouter.get("/all", getAllWorkspaceUserIsMemberOfController);
workspaceRouter.get("/:id", getWorkspaceByIdController);
workspaceRouter.get("/:id/members", getMembersByWorkspaceIdController);
workspaceRouter.get("/:id/analytics", getWorkspaceAnalyticsController);

workspaceRouter.put("/:id/change/member/role", changeMemberRoleInWorkspaceController);
workspaceRouter.put("/:id/update", updateWorkspaceByIdController);

workspaceRouter.delete("/:id/delete", deleteWorkspaceByIdController);
export default workspaceRouter;
