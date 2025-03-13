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

export const getAllTasksService = async (
  workspaceId: string,
  filters: {
    projectId?: string;
    status?: string[];
    priority?: string[];
    assignedTo?: string[];
    keyword?: string;
    dueDate?: string;
  },
  pagination: {
    pageSize: number;
    pageNumber: number;
  }
) => {
  const query: Record<string, any> = {
    workspace: workspaceId
  };

  if (filters.projectId) {
    query.project = filters.projectId;
  }

  if (filters.status && filters.status?.length > 0) {
    query.status = { $in: filters.status };
  }

  if (filters.priority && filters.priority?.length > 0) {
    query.priority = { $in: filters.priority };
  }

  if (filters.assignedTo && filters.assignedTo?.length > 0) {
    query.assignedTo = { $in: filters.assignedTo };
  }

  if (filters.keyword && filters.keyword !== undefined) {
    query.title = { $regex: filters.keyword, $options: "i" };
  }

  if (filters.dueDate) {
    query.dueDate = {
      $eq: new Date(filters.dueDate)
    };
  }

  //Pagination Setup
  const { pageSize, pageNumber } = pagination;
  const skip = (pageNumber - 1) * pageSize;

  const [tasks, totalCount] = await Promise.all([
    TaskModel.find(query)
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .populate("assignedTo", "_id name profilePicture -password")
      .populate("project", "_id emoji name"),
    TaskModel.countDocuments(query)
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    tasks,
    pagination: {
      pageSize,
      pageNumber,
      totalCount,
      totalPages,
      skip
    }
  };
};

export const getTaskByIdService = async (workspaceId: string, projectId: string, taskId: string) => {
  const project = await ProjectModel.findById(projectId);

  if (!project || project.workspace.toString() !== workspaceId.toString()) {
    throw new NotFoundException("Project not found or does not belong to this workspace");
  }

  const task = await TaskModel.findOne({
    _id: taskId,
    workspace: workspaceId,
    project: projectId
  }).populate("assignedTo", "_id name profilePicture -password");

  if (!task) {
    throw new NotFoundException("Task not found.");
  }

  return task;
};

export const deleteTaskService = async (workspaceId: string, taskId: string) => {
  const task = await TaskModel.findOneAndDelete({
    _id: taskId,
    workspace: workspaceId
  });

  if (!task) {
    throw new NotFoundException("Task not found or does not belong to the specified workspace");
  }

  return;
};
