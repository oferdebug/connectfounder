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

    const profileData = await request.json();

    // Update the user with profile information
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        fullName: profileData.fullName,
        bio: profileData.bio,
        location: profileData.location,
        company: profileData.company,
        jobTitle: profileData.jobTitle,
        industry: profileData.industry,
        experience: profileData.experience,
        skills: JSON.stringify(profileData.skills || []),
        interests: JSON.stringify(profileData.interests || []),
        linkedinUrl: profileData.linkedinUrl,
        twitterUrl: profileData.twitterUrl,
        websiteUrl: profileData.websiteUrl,
        phoneNumber: profileData.phoneNumber,
        startupStage: profileData.startupStage,
        fundingStage: profileData.fundingStage,
        teamSize: profileData.teamSize ? parseInt(profileData.teamSize) : null,
        lookingFor: JSON.stringify(profileData.lookingFor || []),
        availableForMentoring: profileData.availableForMentoring,
        openToInvestment: profileData.openToInvestment,
        willingToRelocate: profileData.willingToRelocate,
      },
    });

    return NextResponse.json({ 
      success: true, 
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        fullName: updatedUser.fullName
      }
    });

  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'Profile update failed' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        bio: true,
        location: true,
        company: true,
        jobTitle: true,
        industry: true,
        experience: true,
        skills: true,
        interests: true,
        linkedinUrl: true,
        twitterUrl: true,
        websiteUrl: true,
        phoneNumber: true,
        startupStage: true,
        fundingStage: true,
        teamSize: true,
        lookingFor: true,
        availableForMentoring: true,
        openToInvestment: true,
        willingToRelocate: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });

  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}
