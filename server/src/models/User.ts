import { model, Schema } from "mongoose";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  googleId?: string;
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
  password: {
    type: String,
    required() {
      return !this.googleId;
    },
  },
  googleId: {
    type: String,
    unique: true,
  },
  path: {
    type: String,
    default: "",
  },
  messages: [{ type: String }],
});

export default model<IUser>("User", UserSchema);
