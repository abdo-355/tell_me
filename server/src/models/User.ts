import { model, Schema } from "mongoose";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  verified: boolean;
  verificationCode: string;
  password?: string;
  googleId?: string;
  facebookId?: string;
  // path to send messages to
  path: string;
  //for recieved messages
  messages: string[];
}

const UserSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
  },
  verificationCode: {
    type: String,
    required() {
      return !this.verified;
    },
  },
  password: {
    type: String,
    required() {
      return !this.googleId && !this.facebookId;
    },
  },
  googleId: {
    type: String,
  },
  facebookId: {
    type: String,
  },

  path: {
    type: String,
    default: "",
  },
  messages: {
    type: [String],
  },
});

export default model<IUser>("User", UserSchema);
