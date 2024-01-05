'use client';

import { Hotel } from '@/models/hotel';
import { getHotelsById } from '@/services/hotels';
import { FC, useContext } from 'react';
import { BeatLoader } from 'react-spinners';
import useSWR from 'swr';
import HotelImages from './HotelImages';
import { Button } from '../ui/Button';
import KakaoMap from '../KakaoMap';
import { numberWithCommas } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { CheckoutContext } from '@/context/CheckoutInfoContext';

interface HotelDetailProps {
  id: string;
}

const HotelDetail: FC<HotelDetailProps> = ({ id }) => {
  const { checkoutInfo, setCheckoutInfo } = useContext(CheckoutContext);
  const router = useRouter();
  const { data: hotel, isLoading } = useSWR<Hotel>(`/api/hotel/${id}`, () =>
    getHotelsById(id)
  );

  const getTagNames = (tag: string) => {
    switch (tag) {
      case 'popular':
        return '인기';
      case 'new':
        return '신규';
      case 'event':
        return '이벤트';
      case 'sale':
        return '특가';
      default:
        return '';
    }
  };
  return (
    <>
      <section className="mt-10 h-screen">
        {isLoading && (
          <div className="flex justify-center h-32">
            <BeatLoader color="red" />
          </div>
        )}
        {hotel && (
          <>
            <HotelImages
              name={hotel.name}
              images={[hotel.mainImage, '', '', '', '', '', '']}
            />
            <div className="mt-10 flex">
              <div className="basis-2/3 mr-10">
                <p className="text-lg text-[#49727A] font-semibold">
                  {hotel.category}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-3xl font-bold">{`${
                    hotel.tags && `[${getTagNames(hotel.tags[0])}]`
                  } ${hotel.name}`}</p>
                  <Button
                    onClick={() => {
                      setCheckoutInfo({ ...checkoutInfo, hotelId: hotel.id });
                      router.push(`/checkout/${hotel.id}`);
                    }}
                  >
                    예약하기
                  </Button>
                </div>
                <div className="flex items-center mt-4">
                  <p className="font-semibold text-2xl">
                    {`₩${numberWithCommas(
                      hotel.discountPrice ? hotel.discountPrice : hotel.price
                    )}`}
                  </p>
                  <p className="ml-1 text-base">/박</p>
                </div>
                <div className="mt-10 border-t border-t-gray-200">
                  <p className="text-lg font-bold mt-5 mb-6">숙소 소개</p>
                  <p className="text-gray-500">
                    양양의 해수욕장과 산을 즐기기에 편리한 위치로 편리하고
                    편안한 휴식을 즐길 수 있는 호텔입니다 <br /> 모던하고 깔끔한
                    느낌의 외관과 항상 청결하고 쾌적하게 관리되는 객실이
                    마련되어 있습니다
                  </p>
                </div>
              </div>
              <div className="basis-1/3">
                <div className="rounded-lg overflow-hidden">
                  <KakaoMap latitude={37.56457} longitude={126.98} />
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default HotelDetail;
