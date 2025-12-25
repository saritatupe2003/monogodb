'use server'

import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function SignUpAction(prevState, formData) {
  try {
    await connectDB();

    const name = formData.get("name");
    const mobile = formData.get("mobile");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      return { error: "Email ani password required", success: "" };
    }

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { error: "User already exists", success: "" };
    }

    await User.create({
      name,
      mobile,
      email,
      password, // (next step mdhe bcrypt karu)
    });

    return { success: "Signup successful!", error: "" };
  } catch (error) {
    return { error: "Something went wrong", success: "" };
  }
}
