import { NextResponse } from "next/server";
// If "@/lib/auth" exports a default function for token creation:
// If "@/lib/auth" exports a default function for token creation:
import {createToken} from "@/lib/auth";

// OR, if the function is named differently, e.g. "generateToken":
// import { generateToken as createToken } from "@/lib/auth";

// OR, if the function is named differently, e.g. "generateToken":
// import { generateToken as createToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    console.log("🔐 Login attempt for email:", email);

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // TODO: Replace with actual authentication logic
    // For now, accept any email/password combination for testing
    if (password.length < 3) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Create user object (replace with actual user from database)
    const user = {
      id: "user_123",
      email: email,
      fullName: "Test User",
      profileImage: null,
    };

    // Create JWT token
    const token = createToken({
      id: user.id,
      email: user.email,
    });

    console.log("✅ Login successful for user:", user.email);

    // Create response with user data and token
    const response = NextResponse.json({
      message: "Login successful",
      token: token,
      user: user,
    });

    // Set HTTP-only cookie for middleware to read
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // Set user cookie (not HTTP-only so client can read it)
    response.cookies.set({
      name: "user",
      value: JSON.stringify(user),
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // Set auth flag cookie
    response.cookies.set({
      name: "isAuthenticated",
      value: "true",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error("💥 Login error:", error);
    return NextResponse.json(
      { message: "Authentication failed" },
      { status: 500 }
    );
  }
}
