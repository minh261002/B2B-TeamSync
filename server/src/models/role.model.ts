import mongoose, {Schema, Document} from "mongoose";
import { Roles, PermissionsType, RolesType, Permissions } from "~/constants/enum";
import { RolePermissions } from '../utils/role-permission';

export interface RoleDocument extends Document {
  name: RolesType;
  permissions: Array<PermissionsType>;
};

const roileSchema = new Schema<RoleDocument>({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: Object.values(Roles),
  },
  permissions: {
    type: [String],
    enum: Object.values(Permissions),
    required: true,
    default: function(this: RoleDocument) {
      return RolePermissions[this.name];
    }
  }
}, { timestamps: true });
