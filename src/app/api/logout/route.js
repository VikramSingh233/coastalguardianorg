// app/api/logout/route.js
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Create response
    
    // Clear the token cookie
    response.cookies.set("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(0), // expire immediately
        path: "/",
    });
    return  NextResponse.json({ message: "Logout successful" });
  } catch (error) {
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
