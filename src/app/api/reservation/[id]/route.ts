import { getReservationByConfirmNumber } from '@/services/reservation';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const id = params.id; // 'a', 'b', or 'c'
  return getReservationByConfirmNumber(id).then((res) => {
    return NextResponse.json(res);
  });
}
