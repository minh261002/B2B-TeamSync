import { NotFoundException } from "../utils/appError";
import UserModel from "../models/user.model";
import { Messages } from "../constants/message";

export const getCurrentUserService = async (userId: string) => {
  const user = await UserModel.findById(userId).populate("currentWorkspace").select("-password");

  if (!user) {
    throw new NotFoundException(Messages.NOT_FOUND);
  }

  return { user };
};
