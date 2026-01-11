"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import bcrypt from "bcryptjs";
import { addUser } from "@/services/addUser";
import { loginUser } from "@/services/loginuser";

/* ================= SIGNUP ================= */
export async function SignUpAction(prevState, formData) {
  try {
    const name = formData.get("name");
    const mobile = formData.get("mobile");
    const email = formData.get("email");
    const password = formData.get("password");

    const hashedPassword = await bcrypt.hash(password, 10);

    await addUser({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    return {
      success: true,
      message: "User added",
    };
  } catch (err) {
    return {
      success: false,
      message: "Signup failed",
    };
  }
}

/* ================= LOGIN ================= */
export async function Login(prevState, formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const user = await loginUser(email, password);

    if (!user) {
      return { success: false, message: "Invalid email or password" };
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return { success: true, message: "Login successful" };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Login failed" };
  }
}



