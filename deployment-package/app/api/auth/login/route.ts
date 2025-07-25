import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "your-super-secret-jwt-key-change-this-in-production";

export async function POST(req: Request) {
  try {
    console.log("Login API called");

    // Parse request body
    const body = await req.json();
    console.log("Request body:", body);

    const { email, password } = body;

    // Basic validation
    if (!email || !password) {
      console.log("Missing email or password");
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user by email
    console.log("Looking for user with email:", email);
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log("User not found");
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    console.log("User found, verifying password");

    // Verify password using bcrypt directly
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      console.log("Invalid password");
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    console.log("Password verified, creating token");

    // Create JWT token directly
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log("Token created:", token.substring(0, 20) + "...");

    // Create response with user data (excluding password)
    const userData = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    };

    const response = NextResponse.json(
      {
        message: "Login successful",
        user: userData,
      },
      { status: 200 }
    );

    // Set HTTP-only cookie for server-side verification
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    // Set user cookie (not HTTP-only so client can read it)
    response.cookies.set("user", JSON.stringify(userData), {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    // Set auth flag cookie (not HTTP-only so client can read it)
    response.cookies.set("isAuthenticated", "true", {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    // Also set a client-readable token for convenience (separate from HTTP-only)
    response.cookies.set("clientToken", "true", {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    console.log("Login successful for:", email);
    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
