import { client } from '../../sanity/lib/client';
import { v4 as uuidv4 } from 'uuid';
import { urlFor } from './sanity';

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
    .then(() => {
      return { success: confirmNum };
    });
}

export async function getReservationByConfirmNumber(confirmNumber: string) {
  return client
    .fetch(
      `*[_type == "reservation" && confirmNumber == "${confirmNumber}"][0]{
        ...,
        hotel->{
          ...,
          "id":_id,
          "location":location->title
        
        },
        
      }`
    )
    .then((reservation) => {
      return {
        ...reservation,
        hotel: {
          ...reservation.hotel,
          mainImage: urlFor(reservation.hotel.mainImage),
        },
      };
    });
}
