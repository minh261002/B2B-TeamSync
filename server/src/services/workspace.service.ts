import UserModel from "../models/user.model";
import { NotFoundException } from "../utils/appError";
import { Messages } from "../constants/message";
import RoleModel from "../models/role.model";
import { Roles, TaskStatus } from "../constants/enum";
import WorkspaceModel from "src/models/workspace.model";
import MemberModel from "src/models/member.model";
import mongoose from "mongoose";
import TaskModel from "src/models/task.model";

export const createWorkspaceService = async (
  userId: string,
  body: {
    name: string;
    description?: string | null;
  }
) => {
  const { name, description } = body;

  const user = await UserModel.findById(userId);

  if (!user) {
    throw new NotFoundException(Messages.NOT_FOUND);
  }

  const ownerRole = await RoleModel.findOne({ name: Roles.OWNER });
  if (!ownerRole) {
    throw new NotFoundException(Messages.NOT_FOUND);
  }

  const workspace = new WorkspaceModel({
    name: name,
    description: description,
    owner: user._id
  });
  await workspace.save();

  const member = new MemberModel({
    userId: user._id,
    workspaceId: workspace._id,
    role: ownerRole._id,
    joinedAt: new Date()
  });
  await member.save();

  user.currentWorkspace = workspace._id as mongoose.Types.ObjectId;
  await user.save();

  return { workspace };
};

export const getAllWorkspaceUserIsMemberOfService = async (userId: string) => {
  const memberships = await MemberModel.find({ userId: userId }).populate("workspaceId").select("-password").exec();
  const workspaces = memberships.map((member) => member.workspaceId);

  return { workspaces };
};

export const getWorkspaceByIdService = async (workspaceId: string) => {
  const workspace = await WorkspaceModel.findById(workspaceId);
  if (!workspace) {
    throw new NotFoundException(Messages.NOT_FOUND);
  }

  const member = await MemberModel.find({ workspaceId }).populate("role");

  const workspaceWithMember = {
    ...workspace.toObject(),
    members: member
  };

  return { workspace: workspaceWithMember };
};

export const getMembersByWorkspaceIdService = async (workspaceId: string) => {
  const members = await MemberModel.find({ workspaceId })
    .populate("userId", "name email profilePicture -password")
    .populate("role", "name");

  const roles = await RoleModel.find({}, { name: 1, _id: 1 }).select("-permission").lean();

  return { members, roles };
};

export const getWorkspaceAnalyticsService = async (workspaceId: string) => {
  const currentDate = new Date();

  const totalTasks = await TaskModel.countDocuments({ workspace: workspaceId });

  const overdueTasks = await TaskModel.countDocuments({
    workspace: workspaceId,
    dueDate: { $lt: currentDate },
    status: { $ne: TaskStatus.DONE }
  });

  const completedTasks = await TaskModel.countDocuments({
    workspace: workspaceId,
    status: TaskStatus.DONE
  });

  const analytics = {
    totalTasks,
    overdueTasks,
    completedTasks
  };

  return { analytics };
};
