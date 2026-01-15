import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

export async function addUser(data) {
  await connectDB(); // MongoDB ला connect

  console.log(" Adding user:", data);

  try {
    const newUser = await User.create(data); // Database मध्ये save
    console.log("User saved:", newUser);
    return newUser;
  } catch (err) {
    console.error(" Error saving user:", err); 
    throw err; // वर पाठवा, Signup function ला कळायला
  }
}
