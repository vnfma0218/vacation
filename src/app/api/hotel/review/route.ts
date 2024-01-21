import { addReview } from '@/services/hotels';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { hotelId, name, comment, rate, confirmNumber } = await request.json();
  return addReview({ comment, hotelId, name, rate, confirmNumber }).then(() => {
    return NextResponse.json({ success: true });
  });
}
