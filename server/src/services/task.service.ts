import ProjectModel from "../models/project.model";
import { NotFoundException } from "../utils/appError";
import { Messages } from "../constants/message";
import MemberModel from "../models/member.model";
import TaskModel from "../models/task.model";
import { TaskPriority, TaskStatus } from "../constants/enum";

export const createTaskService = async (
  workspaceId: string,
  projectId: string,
  userId: string,
  body: {
    title: string;
    description?: string;
    priority: string;
    status: string;
    assignedTo?: string | null;
    dueDate?: string;
  }
) => {
  const { title, description, priority, status, assignedTo, dueDate } = body;

  const project = await ProjectModel.findById(projectId);
  if (!project || project.workspace.toString() !== workspaceId) {
    throw new NotFoundException(Messages.NOT_FOUND);
  }

  if (assignedTo) {
    const isAssignedToMember = await MemberModel.exists({ userId: assignedTo, workspaceId });
    if (!isAssignedToMember) {
      throw new NotFoundException(Messages.NOT_FOUND);
    }
  }

  const task = await new TaskModel({
    title,
    description,
    priority: priority || TaskPriority.MEDIUM,
    status: status || TaskStatus.TODO,
    assignedTo,
    dueDate,
    project: projectId,
    workspace: workspaceId,
    createdBy: userId
  });
  await task.save();

  return { task };
};
