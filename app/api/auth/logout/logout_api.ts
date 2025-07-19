import { NextResponse } from "next/server";

export async function POST() {
  try {
    console.log("🚪 Logout request received");

    const response = NextResponse.json({
      message: "Logout successful",
    });

    // Clear all auth cookies
    response.cookies.set({
      name: "token",
      value: "",
      expires: new Date(0),
      path: "/",
    });

    response.cookies.set({
      name: "user",
      value: "",
      expires: new Date(0),
      path: "/",
    });

    response.cookies.set({
      name: "isAuthenticated",
      value: "",
      expires: new Date(0),
      path: "/",
    });

    console.log("✅ Logout successful, cookies cleared");
    return response;
  } catch (error) {
    console.error("💥 Logout error:", error);
    return NextResponse.json(
      { message: "Logout failed" },
      { status: 500 }
    );
  }
}