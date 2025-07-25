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

    const { eventId } = await request.json();

    if (!eventId) {
      return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
    }

    // Check if user is already attending
    const existingAttendance = await prisma.eventAttendee.findFirst({
      where: {
        userId: userId,
        eventId: eventId
      }
    });

    if (existingAttendance) {
      // Remove attendance (toggle off)
      await prisma.eventAttendee.delete({
        where: {
          id: existingAttendance.id
        }
      });

      return NextResponse.json({ success: true, attending: false });
    } else {
      // Add attendance
      const attendance = await prisma.eventAttendee.create({
        data: {
          userId: userId,
          eventId: eventId,
          status: 'confirmed'
        }
      });

      return NextResponse.json({ success: true, attending: true, attendance });
    }

  } catch (error) {
    console.error('Event attendance error:', error);
    return NextResponse.json({ error: 'Failed to update attendance' }, { status: 500 });
  }
}
