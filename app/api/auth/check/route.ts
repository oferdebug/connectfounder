import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(request: NextRequest) {
  console.log("🔍 AUTH CHECK API CALLED");
  
  try {
    const authenticated = request.cookies.get("authenticated")?.value;
    const userId = request.cookies.get("userId")?.value;
    
    console.log("🍪 Cookies:", { authenticated, userId });
    
    if (!authenticated || authenticated !== "true" || !userId) {
      return NextResponse.json(
        { isAuthenticated: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    // Get user details
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        fullName: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { isAuthenticated: false, message: "User not found" },
        { status: 401 }
      );
    }

    console.log("✅ User authenticated:", user.email);
    return NextResponse.json({
      isAuthenticated: true,
      user
    });

  } catch (error) {
    console.error("❌ Auth check error:", error);
    return NextResponse.json(
      { isAuthenticated: false, message: "Server error" },
      { status: 500 }
    );
  }
}
