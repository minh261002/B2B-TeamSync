import { PermissionsType, Roles } from "../constants/enum";
import { RolePermissions } from "./role-permission";
import { Messages } from "../constants/message";

export const roleGuard = (role: keyof typeof RolePermissions, requiredPermissions: PermissionsType[]) => {
  const permissions = RolePermissions[role];

  const hasPermission = requiredPermissions.every((permission) => permissions.includes(permission));

  if (!hasPermission) {
    throw new Error(Messages.FORBIDDEN);
  }
};
