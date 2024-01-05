import { CheckoutContext } from '@/context/CheckoutInfoContext';
import { getDiffereceDate, getFormatDate } from '@/lib/utils';
import { Hotel } from '@/models/hotel';
import Image from 'next/image';
import { FC, useContext } from 'react';

interface HotelSummaryProps {
  hotel: Hotel;
}

const HotelSummary: FC<HotelSummaryProps> = ({ hotel }) => {
  const { checkoutInfo } = useContext(CheckoutContext);

  const daysBetween = getDiffereceDate(
    checkoutInfo.checkOut,
    checkoutInfo.checkIn
  );

  return (
    <div className="border p-4 mt-10 rounded-lg">
      {hotel && (
        <>
          <h3 className="font-bold text-lg">{hotel?.name}</h3>
          <div className="w-full h-[120px] mt-3 relative overflow-hidden rounded-lg">
            <Image src={hotel?.mainImage ?? ''} fill alt={hotel?.name ?? ''} />
          </div>
          <div className="flex mt-3">
            <p className="text-sm text-gray-400 mr-6">일정</p>
            <p className="text-sm">{`${getFormatDate(
              checkoutInfo.checkIn
            )} ~ ${getFormatDate(
              checkoutInfo.checkOut
            )}  (${daysBetween}박)`}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default HotelSummary;
