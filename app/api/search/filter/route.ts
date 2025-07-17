import { NextResponse } from 'next/server';
import { Founder } from '@/app/Entites/all';

export async function POST(request: Request) {
  try {
    const filters = await request.json();

    // Create filter query based on provided filters
    const query: any = {};

    if (filters.industry) {
      query.industry = filters.industry;
    }

    if (filters.fundingStage) {
      query.fundingStage = filters.fundingStage;
    }

    if (filters.location) {
      query.location = filters.location;
    }

    const founders = await Founder.find(query);

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
    console.error('Filter error:', error);
    return NextResponse.json(
      { error: 'Failed to apply filters' },
      { status: 500 }
    );
  }
}
