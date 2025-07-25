import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-static';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all users except the current user
    const users = await prisma.user.findMany({
      where: {
        id: { not: userId }, // Exclude current user
      },
    });

    // Parse JSON fields and format the response
    const founders = users.map(user => ({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      bio: (user as any).bio,
      location: (user as any).location,
      company: (user as any).company,
      jobTitle: (user as any).jobTitle,
      industry: (user as any).industry,
      experience: (user as any).experience,
      skills: (user as any).skills ? JSON.parse((user as any).skills) : [],
      interests: (user as any).interests ? JSON.parse((user as any).interests) : [],
      linkedinUrl: (user as any).linkedinUrl,
      twitterUrl: (user as any).twitterUrl,
      websiteUrl: (user as any).websiteUrl,
      startupStage: (user as any).startupStage,
      fundingStage: (user as any).fundingStage,
      teamSize: (user as any).teamSize,
      lookingFor: (user as any).lookingFor ? JSON.parse((user as any).lookingFor) : [],
      availableForMentoring: (user as any).availableForMentoring,
      openToInvestment: (user as any).openToInvestment,
      willingToRelocate: (user as any).willingToRelocate,
      createdAt: user.createdAt,
    }));

    return NextResponse.json({ founders });

  } catch (error) {
    console.error('Founders fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch founders' }, { status: 500 });
  }
}
