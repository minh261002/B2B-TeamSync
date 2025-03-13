import { Router } from "express";
import { createTaskController } from "../controllers/task.controller";

const taskRouter = Router();

taskRouter.post("/project/:projectId/workspaces/:workspaceId/create", createTaskController);

export default taskRouter;
