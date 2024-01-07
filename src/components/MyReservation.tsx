'use client';
import { Reservation } from '@/models/reservation';
import { getReservationByConfirmNumber } from '@/services/reservation';
import { FC } from 'react';
import useSWR from 'swr';
import BackButton from './ui/BackButton';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

interface MyReservationProps {
  confirmId: string;
}

const MyReservation: FC<MyReservationProps> = ({ confirmId }) => {
  const param = useSearchParams();
  // const confirmId = param.get('confirmId');
  console.log('confirmId', confirmId);
  // const { data: reservation } = useSWR<Reservation>(
  //   `/api/myReservation/${confirmId}`,
  //   () => getReservationByConfirmNumber(confirmId!)
  // );
  const { data: reservation } = useSWR<Reservation>(
    `/api/reservation/${confirmId}`
  );
  console.log('reservation222', reservation);
  return (
    <div>
      <div className="flex items-center text-2xl font-semibold">
        <BackButton />
        <span className="ml-5">예약내역 상세</span>
      </div>
      {!reservation && (
        <div className="text-center mt-20">
          <p className="text-3xl">예약 내역이 없습니다</p>
          <p className="text-lg mt-10 text-gray-500">
            예약번호를 다시 확인해주세요
          </p>
        </div>
      )}

      {reservation && (
        <>
          <div className="border-b pb-2">
            <p className="text-2xl font-semibold mt-10">이용 전</p>
          </div>
          <div className="mt-4">
            <div className="flex">
              <div className="relative w-[160px] h-[160px] overflow-hidden rounded-lg">
                <Image
                  fill
                  src={reservation?.hotel.mainImage ?? ''}
                  alt={reservation?.hotel.name ?? ''}
                />
              </div>
              <div className="ml-4 mt-2">
                <p className="font-semibold text-lg">
                  {reservation?.hotel.name}
                </p>
                <p className="text-sm text-gray-400">
                  {reservation?.hotel.location}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex">
              <p className="w-[100px] text-sm text-gray-400">일정</p>
              <p className="text-sm">{`${reservation.checkIn} ~ ${reservation.checkOut}`}</p>
            </div>
          </div>
          <div className="border-t my-5 "></div>
          <div className="mt-5">
            <p className="font-semibold text-lg">예약 정보</p>
            <div className="mt-5 flex">
              <p className="w-[100px] text-sm text-gray-400">예약 번호</p>
              <p className="text-sm">{`${reservation.confirmNumber}`}</p>
            </div>
            <div className="mt-5 flex">
              <p className="w-[100px] text-sm text-gray-400">에약자 이름</p>
              <p className="text-sm">{`${reservation.name}`}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyReservation;
