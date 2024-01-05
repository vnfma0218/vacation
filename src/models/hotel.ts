import { title } from 'process';

export type HotelCategory = {
  id: string;
  title: string;
  image: string;
  hotelCount: number;
};
export type Hotel = {
  id: string;
  name: string;
  location: {
    title: string;
  };
  price: number;
  discountPrice: number;
  rate: number;
  tags: string[];
  mainImage: string;
  category: string;
};
