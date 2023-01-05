import { model, Schema } from "mongoose";

interface IUser {
  firsName: string;
  lastName: string;
  email: string;
  password: string;
  messages: string[];
}

const UserSchema = new Schema<IUser>({
  firsName: {
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
    required: true,
  },
  messages: [{ type: String }],
});

export default model<IUser>("User", UserSchema);
