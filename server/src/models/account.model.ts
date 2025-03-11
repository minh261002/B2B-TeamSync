import mongoose, {Document, Schema} from "mongoose";
import { ProviderType, Provider } from "~/constants/enum";

export interface AccountDocument extends Document {
  provider: ProviderType;
  providerId: string;
  userId: mongoose.Types.ObjectId;
  refreshToken: string | null;
  tokenExpiry: Date | null;
  createdAt: Date;
  updatedAt: Date;
}


const accountSchema = new Schema<AccountDocument>({
  provider: {
    type: String,
    enum: Object.values(Provider),
    required: true,
  },
  providerId: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  refreshToken: {
    type: String,
    default: null,
  },
  tokenExpiry: {
    type: Date,
    default: null,
  }
}, {
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      delete ret.res;
    }
  }
});

const AccountModel = mongoose.model<AccountDocument>("Account", accountSchema);
export default AccountModel;