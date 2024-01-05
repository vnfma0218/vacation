import { Hotel } from './hotel';

export type Reservation = {
  id: string;
  hotel: Hotel;
  checkIn: Date;
  checkOut: Date;
  person: number;
  visitType: string;
  confirmNumber: string;
  name: string;
};
