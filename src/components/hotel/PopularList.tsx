'use client';
import { Hotel } from '@/models/hotel';
import useSWR from 'swr';
import CarouselWrapper from '../CarouselWrapper';
import HotelCard from './HotelCard';
import { getHotelsByTag } from '@/services/hotels';
import { BeatLoader } from 'react-spinners';
import { useEffect, useState } from 'react';

const PopularList = ({}) => {
  const { data: popularHotelList, isLoading } = useSWR<Hotel[]>(
    '/api/hotels/popular',
    () => getHotelsByTag('popular')
  );

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (isDragging) {
        setIsDragging(false);
      }
    }, 1000);
  }, [isDragging]);

  const beforeChange = () => {
    setIsDragging(true);
  };

  const afterChange = () => {
    setIsDragging(false);
  };

  return (
    <section className="my-10 ">
      <p className="font-bold mb-3">인기 호텔</p>
      {isLoading ? (
        <div
          role="status"
          className="flex flex-wrap md:flex-nowrap gap-5 space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <li className="list-none w-full">
              <div
                key={index}
                className="
                    m-auto w-full max-w-[250px] h-[150px]
                    bg-gray-300 rounded  dark:bg-gray-700"
              ></div>
            </li>
          ))}
        </div>
      ) : (
        // <div className="flex justify-center h-32">
        //   <BeatLoader color="red" />
        // </div>
        <CarouselWrapper beforeChange={beforeChange} afterChange={afterChange}>
          {popularHotelList?.map((hotel) => {
            return (
              <HotelCard key={hotel.id} hotel={hotel} isDragging={isDragging} />
            );
          })}
        </CarouselWrapper>
      )}
    </section>
  );
};

export default PopularList;
