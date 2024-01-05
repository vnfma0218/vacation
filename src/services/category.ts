import { HotelCategory } from '@/models/hotel';
import { client } from '../../sanity/lib/client';
import { urlFor } from './sanity';

export async function getCategoryList() {
  return client
    .fetch(
      `*[_type == "category"]{
        ...,
        "id": _id,
        "hotelCount": count(*[_type == "hotel" && references(^._id)])
        }`
    )
    .then((res) => {
      return res.map((category: HotelCategory) => {
        return { ...category, image: urlFor(category.image) };
      });
    });
}
export async function getLocations() {
  return client.fetch(
    `*[_type == "location"] | order(order asc){
        ...,
        "id": _id,
        }`
  );
}
