import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/dbconfig/dbconfig";
import User from "@/models/user.model";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    console.log(email, password);
    await connectDB();

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    return NextResponse.json({ message: "Signup successful!" }, { status: 201 });
  } catch (error) {
    // console.error(error);
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}
