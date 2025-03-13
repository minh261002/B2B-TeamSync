import ProjectModel from "../models/project.model";
import { BadRequestException, NotFoundException } from "../utils/appError";
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

export const updateTaskService = async (
  workspaceId: string,
  projectId: string,
  taskId: string,
  userId: string,
  body: {
    title?: string;
    description?: string;
    priority?: string;
    status?: string;
    assignedTo?: string | null;
    dueDate?: string;
  }
) => {
  const project = await ProjectModel.findById(projectId);
  if (!project || project.workspace.toString() !== workspaceId) {
    throw new NotFoundException(Messages.NOT_FOUND);
  }

  const task = await TaskModel.findById(taskId);
  if (!task || task.project.toString() !== projectId) {
    throw new NotFoundException(Messages.NOT_FOUND);
  }

  const updateTask = await TaskModel.findByIdAndUpdate(
    taskId,
    {
      ...body
    },
    { new: true }
  );
  if (!updateTask) {
    throw new BadRequestException(Messages.INVALID_INPUT);
  }

  return { task: updateTask };
};
