import { Messages } from "../constants/message";
import ProjectModel from "../models/project.model";
import { NotFoundException } from "../utils/appError";

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
