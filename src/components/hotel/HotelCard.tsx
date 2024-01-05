import { getCategoryName, numberWithCommas } from '@/lib/utils';
import { Hotel } from '@/models/hotel';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import RateStar from './RateStar';

interface HotelCardProps {
  hotel: Hotel;
  isDragging: boolean;
}

const HotelCard: FC<HotelCardProps> = ({ hotel, isDragging }) => {
  const {
    mainImage,
    name,
    location,
    price,
    id,
    rate,
    category,
    discountPrice,
  } = hotel;

  const router = useRouter();

  return (
    <li
      key={id}
      className="list-none w-full"
      onClick={() => {
        isDragging ? null : router.push(`/detail/${id}`);
      }}
    >
      <div className="group cursor-pointer relative m-auto w-full max-w-[250px] h-[150px] rounded-lg overflow-hidden">
        <Image
          src={mainImage}
          alt={name}
          className="object-cover w-full"
          fill
          sizes="250px"
        />
        <div className="absolute inset-0 bg-neutral-700 opacity-0 hover:opacity-30 ease-in-out"></div>
      </div>

      <div className="w-full max-w-[250px] m-auto mt-2">
        <p className="text-slate-500 text-xs">{getCategoryName(category)}</p>
        <p className="font-bold">{name}</p>
        <p className="text-slate-500 text-sm">{location}</p>
        {rate ? (
          <RateStar rate={rate} />
        ) : (
          <p className="text-slate-500 text-xs mt-[10px]">미평가</p>
        )}
        <div className="mt-5  flex items-center">
          <p className="font-bold text-lg">
            {numberWithCommas(discountPrice ? discountPrice : price)}
            <span className="text-sm font-light">원</span>
          </p>
          {discountPrice && (
            <p className="ml-1 line-through text-xs text-slate-500 mt-1">{`${numberWithCommas(
              price
            )}원`}</p>
          )}
        </div>
      </div>
    </li>
  );
};
{
  /* </Link> */
}

export default HotelCard;
