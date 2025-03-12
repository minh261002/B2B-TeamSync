import { Router } from "express";
import {
  createWorkspaceController,
  getAllWorkspaceUserIsMemberOfController,
  getWorkspaceByIdController
} from "src/controllers/workspace.controller";

const workspaceRouter = Router();

workspaceRouter.post("/create/new", createWorkspaceController);
workspaceRouter.get("/all", getAllWorkspaceUserIsMemberOfController);
workspaceRouter.get("/:id", getWorkspaceByIdController);

export default workspaceRouter;
