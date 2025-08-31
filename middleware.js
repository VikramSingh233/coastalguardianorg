import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"; // if using JWT

export function middleware(req) {
  const token = req.cookies.get("token")?.value; // token stored in cookie

  const protectedRoutes = ["/dashboard", "/Work", "/onboardingdetails","/map"]; 

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET); // check validity
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*","/dashboard", "/Work/:path*","/Work","/map","/onboardingdetails", "/onboardingdetails/:path*","/map/:path*"], // protected paths
};
