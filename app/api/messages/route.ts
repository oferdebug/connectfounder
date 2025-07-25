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

    const { receiverId, content, type = 'text' } = await request.json();

    if (!receiverId || !content) {
      return NextResponse.json({ error: 'Receiver ID and content are required' }, { status: 400 });
    }

    const message = await prisma.message.create({
      data: {
        senderId: userId,
        receiverId: receiverId,
        content: content,
        type: type
      }
    });

    return NextResponse.json({ success: true, message });

  } catch (error) {
    console.error('Message creation error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const conversationWith = searchParams.get('with');

    if (conversationWith) {
      // Get messages for specific conversation
      const messages = await prisma.message.findMany({
        where: {
          OR: [
            { senderId: userId, receiverId: conversationWith },
            { senderId: conversationWith, receiverId: userId }
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
        },
        orderBy: {
          createdAt: 'asc'
        }
      });

      return NextResponse.json({ messages });
    } else {
      // Get all conversations (latest message with each person)
      const conversations = await prisma.message.findMany({
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
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      // Group by conversation partner and get latest message
      const conversationMap = new Map();
      
      conversations.forEach(message => {
        const partnerId = message.senderId === userId ? message.receiverId : message.senderId;
        const partner = message.senderId === userId ? message.receiver : message.sender;
        
        if (!conversationMap.has(partnerId)) {
          conversationMap.set(partnerId, {
            partner,
            latestMessage: message,
            unreadCount: message.receiverId === userId && !message.isRead ? 1 : 0
          });
        } else if (message.receiverId === userId && !message.isRead) {
          const existing = conversationMap.get(partnerId);
          existing.unreadCount++;
        }
      });

      const conversationList = Array.from(conversationMap.values());

      return NextResponse.json({ conversations: conversationList });
    }

  } catch (error) {
    console.error('Messages fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { messageId, isRead } = await request.json();

    if (!messageId) {
      return NextResponse.json({ error: 'Message ID is required' }, { status: 400 });
    }

    // Mark message as read (only receiver can do this)
    const message = await prisma.message.update({
      where: {
        id: messageId,
        receiverId: userId // Only receiver can mark as read
      },
      data: {
        isRead: isRead !== false // Default to true
      }
    });

    return NextResponse.json({ success: true, message });

  } catch (error) {
    console.error('Message update error:', error);
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
  }
}
