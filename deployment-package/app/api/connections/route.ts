import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { receiverId, message } = await request.json();

    if (!receiverId) {
      return NextResponse.json({ error: 'Receiver ID is required' }, { status: 400 });
    }

    // Check if connection already exists
    const existingConnection = await prisma.connection.findFirst({
      where: {
        OR: [
          { senderId: userId, receiverId: receiverId },
          { senderId: receiverId, receiverId: userId }
        ]
      }
    });

    if (existingConnection) {
      return NextResponse.json({ error: 'Connection already exists' }, { status: 400 });
    }

    // Create new connection request
    const connection = await prisma.connection.create({
      data: {
        senderId: userId,
        receiverId: receiverId,
        message: message || null,
        status: 'pending'
      }
    });

    return NextResponse.json({ success: true, connection });

  } catch (error) {
    console.error('Connection creation error:', error);
    return NextResponse.json({ error: 'Failed to create connection' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all connections for the user
    const connections = await prisma.connection.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId }
        ]
      },
      include: {
        sender: {
          select: {
            id: true,
            fullName: true,
            email: true
          }
        },
        receiver: {
          select: {
            id: true,
            fullName: true,
            email: true
          }
        }
      }
    });

    return NextResponse.json({ connections });

  } catch (error) {
    console.error('Connections fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch connections' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { connectionId, status } = await request.json();

    if (!connectionId || !status) {
      return NextResponse.json({ error: 'Connection ID and status are required' }, { status: 400 });
    }

    // Update connection status (only receiver can accept/decline)
    const connection = await prisma.connection.update({
      where: {
        id: connectionId,
        receiverId: userId // Only receiver can update status
      },
      data: {
        status: status // 'accepted', 'declined'
      }
    });

    return NextResponse.json({ success: true, connection });

  } catch (error) {
    console.error('Connection update error:', error);
    return NextResponse.json({ error: 'Failed to update connection' }, { status: 500 });
  }
}
