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

    const eventData = await request.json();

    const event = await prisma.event.create({
      data: {
        title: eventData.title,
        description: eventData.description,
        type: eventData.type,
        location: eventData.location,
        virtualLink: eventData.virtualLink,
        startTime: new Date(eventData.startTime),
        endTime: new Date(eventData.endTime),
        maxAttendees: eventData.maxAttendees ? parseInt(eventData.maxAttendees) : null,
        isPublic: eventData.isPublic !== false, // Default to true
        tags: eventData.tags ? JSON.stringify(eventData.tags) : null,
        creatorId: userId,
      },
    });

    return NextResponse.json({ success: true, event });

  } catch (error) {
    console.error('Event creation error:', error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
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
    const type = searchParams.get('type');
    const upcoming = searchParams.get('upcoming') === 'true';

    let whereClause: any = {
      isPublic: true, // Only show public events
    };

    if (type) {
      whereClause.type = type;
    }

    if (upcoming) {
      whereClause.startTime = {
        gte: new Date()
      };
    }

    const events = await prisma.event.findMany({
      where: whereClause,
      include: {
        creator: {
          select: {
            id: true,
            fullName: true,
            email: true
          }
        },
        attendees: {
          include: {
            user: {
              select: {
                id: true,
                fullName: true,
                email: true
              }
            }
          }
        }
      },
      orderBy: {
        startTime: 'asc'
      }
    });

    // Parse JSON fields and format the response
    const formattedEvents = events.map(event => ({
      ...event,
      tags: event.tags ? JSON.parse(event.tags) : [],
      attendeeCount: event.attendees.length,
      isAttending: event.attendees.some(attendee => attendee.userId === userId)
    }));

    return NextResponse.json({ events: formattedEvents });

  } catch (error) {
    console.error('Events fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}
