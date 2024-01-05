import { numberWithCommas } from '@/lib/utils';
import { Hotel } from '@/models/hotel';
import Image from 'next/image';
import { FC } from 'react';
import RateStar from './RateStar';
import Link from 'next/link';

interface HotelSearchCardProps {
  hotel: Hotel;
  index: number;
}

const HotelSearchCard: FC<HotelSearchCardProps> = ({ hotel, index }) => {
  const { mainImage, category, name, price, location, rate } = hotel;
  return (
    <Link href={`/detail/${hotel.id}`} className="flex pb-5">
      <div className="relative w-[45%] h-[240px] rounded-lg overflow-hidden">
        {index < 3 ? (
          <Image src={mainImage} alt="image" fill priority sizes="450px" />
        ) : (
          <Image src={mainImage} alt="image" fill sizes="450px" />
        )}
      </div>
      <div className="ml-5 flex flex-col flex-grow justify-between">
        <div>
          <p className="text-xs text-[#707070] font-light">
            {category ?? '호텔'}
          </p>
          <p className="text-lg text-[#333333] font-semibold">{name}</p>
          <p className="text-sm text-[#707070]">{location}</p>
          {rate ? (
            <RateStar rate={rate} />
          ) : (
            <p className="text-slate-500 text-xs mt-[10px]">미평가</p>
          )}
        </div>
        <p className="self-end text-xl font-bold">
          {' '}
          {`${numberWithCommas(price ?? 1000000)}원`}
        </p>
      </div>
    </Link>
  );
};

export default HotelSearchCard;
