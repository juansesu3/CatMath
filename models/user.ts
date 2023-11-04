import { Schema, model, models } from "mongoose";

export interface IUser extends Document {
  username: string;
  role: 'participante' | 'supervisor';
  points: number;
  currentLevel: number;
  correctAnswers: number;
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    role: {
      type: String,
      enum: ['participante', 'supervisor'],
      required: true
    },
    points: { type: Number, default: 0 },
    currentLevel: { type: Number, default: 0 },
    correctAnswers: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);
export const User = models.User || model("User", UserSchema);