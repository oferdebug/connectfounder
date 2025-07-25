import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ success: true });
  
  // Clear all auth-related cookies
  response.cookies.delete("auth");
  response.cookies.delete("userId");
  response.cookies.delete("token");
  
  return response;
}
