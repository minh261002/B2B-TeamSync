import UserModel from "../models/user.model";
import { BadRequestException, NotFoundException } from "../utils/appError";
import { Messages } from "../constants/message";
import RoleModel from "../models/role.model";
import { Roles, TaskStatus } from "../constants/enum";
import WorkspaceModel from "src/models/workspace.model";
import MemberModel from "src/models/member.model";
import mongoose from "mongoose";
import TaskModel from "src/models/task.model";
import ProjectModel from "src/models/project.model";

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

export const changeMemberRoleInWorkspaceService = async (workspaceId: string, memberId: string, roleId: string) => {
  const workspace = await WorkspaceModel.findById(workspaceId);
  if (!workspace) {
    throw new NotFoundException(Messages.NOT_FOUND);
  }

  const role = await RoleModel.findById(roleId);
  if (!role) {
    throw new NotFoundException(Messages.NOT_FOUND);
  }

  const member = await MemberModel.findOne({
    userId: memberId,
    workspaceId: workspaceId
  });
  if (!member) {
    throw new NotFoundException(Messages.NOT_FOUND);
  }

  member.role = role;
  await member.save();

  return { member };
};

export const updateWorkspaceByIdService = async (workspaceId: string, name: string, description?: string | null) => {
  const workspace = await WorkspaceModel.findById(workspaceId);
  if (!workspace) {
    throw new NotFoundException(Messages.NOT_FOUND);
  }

  workspace.name = name || workspace.name;
  workspace.description = description || workspace.description;
  await workspace.save();

  return { workspace };
};

export const deleteWorkspaceByIdService = async (workspaceId: string, userId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const workspace = await WorkspaceModel.findById(workspaceId).session(session);
    if (!workspace) {
      throw new NotFoundException(Messages.NOT_FOUND);
    }

    if (workspace.owner.toString() !== userId) {
      throw new BadRequestException(Messages.UNAUTHORIZED);
    }

    const user = await UserModel.findById(userId).session(session);
    if (!user) {
      throw new NotFoundException(Messages.NOT_FOUND);
    }

    await ProjectModel.deleteMany({ workspace: workspace._id }).session(session);
    await TaskModel.deleteMany({ workspace: workspace._id }).session(session);
    await MemberModel.deleteMany({ workspaceId: workspace._id }).session(session);

    if (user?.currentWorkspace?.equals(workspaceId)) {
      const memberWorkspace = await MemberModel.findOne({ userId: userId }).session(session);
      user.currentWorkspace = memberWorkspace ? memberWorkspace.workspaceId : null;
      await user.save();
    }

    await workspace.deleteOne().session(session);

    await session.commitTransaction();
    session.endSession();

    return { currentWorkspace: user.currentWorkspace };
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};
