import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Your authentication logic here

    return NextResponse.json({
      message: "Login successful",
      token: "your-auth-token", // Make sure this is included
      user: {
        email,
        // other user data
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Authentication failed" },
      { status: 401 }
    );
  }
}
