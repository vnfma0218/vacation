import { client } from '../../sanity/lib/client';
import { urlFor } from './sanity';
import { Filters } from '@/components/SearchMain';

export async function getHotelsByTag(tag: string) {
  return client
    .fetch(
      `*[_type == "hotel" && "${tag}" in tags]{
    ...,
    "id": _id,
    "category": category->title,
    "location": location->title,
    "image": mainImage
  }`
    )
    .then((res) => {
      return res.map((hotel: any) => {
        return { ...hotel, mainImage: urlFor(hotel.mainImage) };
      });
    });
}
export async function getHotelsById(id: string) {
  return client
    .fetch(
      `*[_type == "hotel" && _id == "${id}"][0]{
    ...,
    "id": _id,
    "category": category->title,
    "location": location->title,
  }`
    )
    .then((res) => {
      return { ...res, mainImage: urlFor(res.mainImage) };
    });
}

export async function getHotelsByFilters(location: string, filter: Filters) {
  const loc =
    location !== '전체' ? `&& location -> title == "${filter.location}"` : '';

  const price = filter.isPriceLimited
    ? `&& price >= ${filter.price.min} && price <= ${filter.price.max}`
    : '';

  const category =
    filter.type !== '전체' ? `&& category -> title == "${filter.type}"` : '';

  const order =
    filter.sort === 'rowPrice'
      ? '| order(price asc)'
      : filter.sort === 'highPrice'
      ? '| order(price desc)'
      : filter.sort === 'star'
      ? '| order(rate desc)'
      : '';

  const rate = filter.sort === 'star' ? '&& rate > ' : '';
  return client
    .fetch(
      `*[_type == "hotel" ${loc} ${price} ${category} ${rate} ] ${order}{
  ...,
  "id": _id,
  "category": category->title,
  "location": location->title,
  "image": mainImage
}`
    )
    .then((res) => {
      return res.map((hotel: any) => {
        return { ...hotel, mainImage: urlFor(hotel.mainImage) };
      });
    });
}
