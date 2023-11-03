import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    username: String,
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