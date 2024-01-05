import { client } from '../../sanity/lib/client';
import { v4 as uuidv4 } from 'uuid';

export async function postReservation(
  name: string,
  checkIn: string,
  checkOut: string,
  person: number,
  hotel: string,
  visitType: string
) {
  const confirmNum = uuidv4();
  return client
    .create({
      _type: 'reservation',
      confirmNumber: confirmNum,
      hotel: {
        _type: 'reference',
        _ref: hotel,
      },
      person,
      checkIn,
      checkOut,
      name,
      visitType,
    })
    .then((res) => {
      return { success: confirmNum };
    });
}
