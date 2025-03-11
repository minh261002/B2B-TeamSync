import mongoose, {Document, Schema} from "mongoose";

export interface MemberDocument extends Document {
  userId: mongoose.Types.ObjectId;
  workspaceId: mongoose.Types.ObjectId;
  joinedAt: Date;
  // role: string;
  createdAt: Date;
  updatedAt: Date;
}

const MemberSchema = new Schema<MemberDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  workspaceId: {
    type: Schema.Types.ObjectId,
    ref: "Workspace",
    required: true,
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const MemberModel = mongoose.model<MemberDocument>("Member", MemberSchema);
export default MemberModel;