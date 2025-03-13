import TaskModel from "../models/task.model";
import { Messages } from "../constants/message";
import ProjectModel from "../models/project.model";
import { NotFoundException } from "../utils/appError";
import mongoose from "mongoose";
import { TaskStatus } from "../constants/enum";

export const createProjectService = async (
  workspaceId: string,
  userId: string,
  body: { emoji?: string; name: string; description?: string }
) => {
  const project = await new ProjectModel({
    ...(body.emoji && { emoji: body.emoji }),
    name: body.name,
    description: body.description,
    workspace: workspaceId,
    createdBy: userId
  });
  await project.save();

  return { project };
};

export const getAllProjectInWorkspaceService = async (workspaceId: string, pageSize: number, pageNumber: number) => {
  const totalCount = await ProjectModel.countDocuments({ workspace: workspaceId });

  const skip = (pageNumber - 1) * pageSize;

  const projects = await ProjectModel.find({ workspace: workspaceId })
    .skip(skip)
    .limit(pageSize)
    .populate("createdBy", "_id name profilePicture -password")
    .sort({ createdAt: -1 });

  const totalPages = Math.ceil(totalCount / pageSize);

  return { projects, totalCount, totalPages, skip };
};

export const getProjectByIdAndWorkspaceIdService = async (projectId: string, workspaceId: string) => {
  const project = await ProjectModel.findOne({ _id: projectId, workspace: workspaceId }).select(
    "_id emoji name description"
  );
  if (!project) {
    throw new NotFoundException(Messages.NOT_FOUND);
  }

  return { project };
};

export const getProjectAnalyticService = async (projectId: string, workspaceId: string) => {
  const project = await ProjectModel.findById(projectId);

  if (!project || project.workspace.toString() !== workspaceId) {
    throw new NotFoundException(Messages.NOT_FOUND);
  }

  const currentDate = new Date();
  const taskAnalytics = await TaskModel.aggregate([
    {
      $match: {
        project: new mongoose.Types.ObjectId(projectId)
      }
    },
    {
      $facet: {
        totalTasks: [
          {
            $count: "count"
          }
        ],
        overdueTasks: [
          {
            $match: {
              dueDate: { $lt: currentDate },
              status: { $ne: TaskStatus.DONE }
            }
          },
          {
            $count: "count"
          }
        ],
        completedTasks: [
          {
            $match: {
              status: TaskStatus.DONE
            }
          },
          {
            $count: "count"
          }
        ]
      }
    }
  ]);

  const _analytics = taskAnalytics[0];
  const analytics = {
    totalTasks: _analytics.totalTasks[0]?.count || 0,
    overdueTasks: _analytics.overdueTasks[0]?.count || 0,
    completedTasks: _analytics.completedTasks[0]?.count || 0
  };

  return { analytics };
};

export const updateProjectService = async (
  workspaceId: string,
  projectId: string,
  body: { emoji?: string; name?: string; description?: string }
) => {
  const { emoji, name, description } = body;

  const project = await ProjectModel.findOne({
    _id: projectId,
    workspace: workspaceId
  });

  if (!project) {
    throw new NotFoundException(Messages.NOT_FOUND);
  }

  if (emoji) project.emoji = emoji;
  if (name) project.name = name;
  if (description) project.description = description;
  await project.save();

  return { project };
};

export const deleteProjectService = async (workspaceId: string, projectId: string) => {
  const project = await ProjectModel.findOne({ _id: projectId, workspace: workspaceId });
  if (!project) {
    throw new NotFoundException(Messages.NOT_FOUND);
  }

  await TaskModel.deleteMany({ project: project._id });
  await project.deleteOne();

  return project;
};
