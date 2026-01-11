import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    mobile: { type: String },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const User =
  mongoose.models.signupUsers ||
  mongoose.model("signupUsers", UserSchema);
