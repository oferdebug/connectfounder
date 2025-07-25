import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const auth = cookieStore.get('auth');
    const userId = cookieStore.get('userId');

    if (!auth || !userId || auth.value !== 'true') {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: userId.value }
    });

    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ 
      authenticated: true, 
      user: { id: user.id, email: user.email, name: user.fullName } 
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
