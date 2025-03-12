import MemberModel from "src/models/member.model";
import { Messages } from "../constants/message";
import WorkspaceModel from "../models/workspace.model";
import { NotFoundException } from "../utils/appError";

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
