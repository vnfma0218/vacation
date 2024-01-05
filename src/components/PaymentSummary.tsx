'use client';

import { FC } from 'react';
import useSWR from 'swr';
import HotelSummary from './hotel/HotelSummary';
import { Hotel } from '@/models/hotel';
import { getHotelsById } from '@/services/hotels';
import { numberWithCommas } from '@/lib/utils';
import { Button } from './ui/Button';

interface PaymentSummaryProps {
  hotelId: string;
  onSubmitForm: () => void;
}

const PaymentSummary: FC<PaymentSummaryProps> = ({ hotelId, onSubmitForm }) => {
  const { data: hotel } = useSWR<Hotel>(`/api/hotel/${hotelId}`, () =>
    getHotelsById(hotelId)
  );
  return (
    <div>
      {hotel && <HotelSummary hotel={hotel} />}
      {hotel && (
        <div className="border p-5 mt-10 rounded-lg">
          <h3 className="font-bold text-lg">결제 금액</h3>
          <div className="mt-3 pb-3 flex justify-between items-center">
            <p className="text-sm text-gray-400">예약금액</p>
            <p className="text-sm">
              {numberWithCommas(
                hotel.discountPrice ? hotel.discountPrice : hotel.price
              )}
            </p>
          </div>

          <div className="mt-1 border-t pt-3 flex justify-between items-center">
            <p>총 결제금액</p>
            <p className="text-xl text-red-400 font-bold">
              {numberWithCommas(
                hotel.discountPrice ? hotel.discountPrice : hotel.price
              )}
            </p>
          </div>
          <Button
            onClick={onSubmitForm}
            className="mt-5 w-full bg-blue-500 hover:bg-opacity-90 hover:bg-blue-500"
            size={'lg'}
          >
            {`${numberWithCommas(
              hotel.discountPrice ? hotel.discountPrice : hotel.price
            )}원 예약하기`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PaymentSummary;
