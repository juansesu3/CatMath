import { Schema, model, models } from "mongoose";

export interface IUser extends Document {
  name: string,
  email: string,
  points: number;
  currentLevel: number;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    points: { type: Number, default: 0 },
    currentLevel: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);
export const User = models.User || model("User", UserSchema);