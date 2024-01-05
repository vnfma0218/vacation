'use client';
import { Hotel } from '@/models/hotel';
import useSWR from 'swr';
import CarouselWrapper from '../CarouselWrapper';
import HotelCard from './HotelCard';
import { getHotelsByTag } from '@/services/hotels';
import { BeatLoader } from 'react-spinners';
import { useState } from 'react';

const SaleList = ({}) => {
  const { data: saleHotels, isLoading } = useSWR<Hotel[]>(
    '/api/hotels/sale',
    () => getHotelsByTag('sale')
  );
  const [isDragging, setIsDragging] = useState(false);

  const beforeChange = () => {
    setIsDragging(true);
  };

  const afterChange = () => {
    setIsDragging(false);
  };

  return (
    <section className="mt-5 pb-28">
      <p className="font-bold mb-3">특가 호텔</p>

      {isLoading ? (
        <div className="flex justify-center">
          <BeatLoader color="red" />
        </div>
      ) : (
        <CarouselWrapper
          slidesToScroll={1}
          afterChange={afterChange}
          beforeChange={beforeChange}
        >
          {saleHotels?.map((hotel) => {
            return (
              <HotelCard key={hotel.id} hotel={hotel} isDragging={isDragging} />
            );
          })}
        </CarouselWrapper>
      )}
    </section>
  );
};

export default SaleList;
