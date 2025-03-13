import MemberModel from "src/models/member.model";
import { Messages } from "../constants/message";
import WorkspaceModel from "../models/workspace.model";
import { BadRequestException, NotFoundException } from "../utils/appError";
import RoleModel from "../models/role.model";
import { Roles } from "../constants/enum";

export const getMemberRoleInWorkspaceService = async (userId: string, workspaceId: string) => {
  const workspace = await WorkspaceModel.findById(workspaceId);
  if (!workspace) {
    throw new NotFoundException(Messages.NOT_FOUND);
  }

  const member = await MemberModel.findOne({ userId, workspaceId }).populate("role");
  if (!member) {
    throw new NotFoundException(Messages.NOT_FOUND);
  }

  const roleName = member.role?.name;

  return { role: roleName };
};

export const joinWorkspaceByInviteCodeService = async (inviteCode: string, userId: string) => {
  const workspace = await WorkspaceModel.findOne({ inviteCode });
  if (!workspace) {
    throw new NotFoundException(Messages.NOT_FOUND);
  }

  const existingMember = await MemberModel.findOne({ userId, workspaceId: workspace._id }).exec();
  if (existingMember) {
    throw new BadRequestException(Messages.ALREADY_EXISTS);
  }

  const role = await RoleModel.findOne({ name: Roles.MEMBER });
  if (!role) {
    throw new NotFoundException(Messages.NOT_FOUND);
  }

  const newMemeber = new MemberModel({
    userId,
    workspaceId: workspace._id,
    role: role._id
  });
  await newMemeber.save();

  return { workspaceId: workspace._id, role: role.name };
};
