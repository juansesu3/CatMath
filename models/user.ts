import { Schema, model, models } from "mongoose";

export interface IUser extends Document {
  name: string,
  email: string,
  password: string,
  role: 'participante' | 'supervisor';
  points: number;
  currentLevel: number;
  correctAnswers: number;

}

const UserSchema = new Schema<IUser>(
  {

    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
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