'use client';
import { HotelCategory } from '@/models/hotel';
import { getCategoryList } from '@/services/category';
import Image from 'next/image';
import { BeatLoader } from 'react-spinners';
import useSWR from 'swr';

const CategoryList = ({}) => {
  const { data: categories, isLoading } = useSWR<HotelCategory[]>(
    '/api/hotels/category',
    () => getCategoryList()
  );
  return (
    <section className="my-10 ">
      <p className="font-bold mb-3">원하는 숙소를 PICK!</p>
      {isLoading ? (
        <div className="flex justify-center h-32">
          <BeatLoader color="red" />
        </div>
      ) : (
        <ul className="flex flex-wrap md:flex-nowrap gap-5">
          {categories?.map((category) => {
            return (
              <li className="relative w-full" key={category.id}>
                <div
                  className="relative m-auto lg:max-w-[350px] lg:h-[300px] md:max-w-[250px] md:h-[200px]
                   w-[200px] h-[150px]
               rounded-lg overflow-hidden"
                >
                  <Image
                    src={category.image}
                    alt={category.title}
                    className="object-cover aspect-auto"
                    fill
                    sizes="300px"
                  />
                  <div className="absolute bottom-14 left-2">
                    <p className="bg-white py-1 px-3 rounded-md font-bold text-base">
                      {category.title}
                    </p>
                  </div>
                  <div className="absolute bottom-5 left-2">
                    <p className="bg-white py-1 px-3 rounded-md font-bold text-xs cursor-pointer">
                      {`${category.hotelCount}개의 숙소 더보러 가기`}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default CategoryList;
