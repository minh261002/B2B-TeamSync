import { Router } from "express";
import { createWorkspaceController } from "src/controllers/workspace.controller";

const workspaceRouter = Router();

workspaceRouter.post("/create/new", createWorkspaceController);

export default workspaceRouter;
