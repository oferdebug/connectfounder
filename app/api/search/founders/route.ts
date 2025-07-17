import { NextResponse } from 'next/server';
import { Founder } from '@/app/Entites/all';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();

    // Search through founders based on the query
    // This is a simple implementation - enhance based on your needs
    const founders = await Founder.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { companyName: { $regex: query, $options: 'i' } },
        { industry: { $regex: query, $options: 'i' } },
      ],
    });

    return NextResponse.json({
      results: founders.map((founder) => ({
        id: founder.id,
        name: founder.name,
        companyName: founder.companyName,
        industry: founder.industry,
        fundingStage: founder.fundingStage,
        location: founder.location,
        avatarUrl: founder.avatarUrl,
      })),
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to perform search' },
      { status: 500 }
    );
  }
}
