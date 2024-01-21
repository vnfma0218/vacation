export type HotelCategory = {
  id: string;
  title: string;
  image: string;
  hotelCount: number;
};

export type Review = {
  id: string;
  comment: string;
  name: string;
  rate: number;
  confirmNumber: string;
};

export type Hotel = {
  id: string;
  name: string;
  location: string;
  price: number;
  discountPrice: number;
  rate: number;
  tags: string[];
  mainImage: string;
  category: string;
  reviews: Review[];
};
