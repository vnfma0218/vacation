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
        <div className="flex justify-center h-32">
          <BeatLoader color="red" />
        </div>
      ) : (
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
