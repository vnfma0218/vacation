'use client';
import { FC, useContext, useState } from 'react';
import PaymentSummary from '@/components/PaymentSummary';
import ReservationForm from '@/components/ReservationForm';
import BackButton from '@/components/ui/BackButton';
import { CheckoutContext } from '@/context/CheckoutInfoContext';
import { postReservation } from '@/services/reservation';
import { format } from 'date-fns';
import ConfirmModal from './ui/\bConfirmModal';
import { useRouter } from 'next/navigation';

interface ReservationProps {
  hotelId: string;
}

const Reservation: FC<ReservationProps> = ({ hotelId }) => {
  const router = useRouter();
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const { checkoutInfo } = useContext(CheckoutContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [visitType, setVisitType] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<{ name: string; visitType: string }>({
    name: '',
    visitType: '',
  });

  const changeVisitType = (value: string) => {
    setError({
      ...error,
      visitType: value === '' ? '방문 방법을 선택해주세요' : '',
    });
    setVisitType(value);
  };

  const changeName = (value: string) => {
    setName(value);
    setError({
      ...error,
      name: value === '' ? '예약자 이름을 입력해주세요' : '',
    });
  };

  const onSubmitForm = () => {
    if (name === '' || visitType === '') {
      return setError({
        ...error,
        name: name === '' ? '예약자 이름을 입력해주세요' : '',
        visitType: visitType === '' ? '방문 방법을 선택해주세요' : '',
      });
    }

    setShowConfirmModal(true);
  };

  const completeReservation = () => {
    const checkIn = format(checkoutInfo.checkIn, 'yyyy-MM-dd');
    const checkOut = format(checkoutInfo.checkOut, 'yyyy-MM-dd');
    setLoading(true);
    postReservation(
      name,
      checkIn,
      checkOut,
      checkoutInfo.personal,
      hotelId,
      visitType
    )
      .then((res) => {
        if (res.success) {
          router.replace(`/complete/${res.success}`);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="basis-2/3">
        <div className="flex items-center">
          <BackButton />
          <h2 className="font-bold text-2xl ml-4">예약 확인</h2>
        </div>
        <ReservationForm
          error={error}
          name={name}
          visitType={visitType}
          changeVisitType={changeVisitType}
          changeName={changeName}
        />
      </div>

      <div className="basis-1/3">
        <PaymentSummary hotelId={hotelId} onSubmitForm={onSubmitForm} />
      </div>

      {showConfirmModal && (
        <ConfirmModal
          isLoading={loading}
          onConfirm={() => completeReservation()}
          headerMessage="예약 완료"
          modalMessage="예약을 진행하시겠습니까?"
          closeModal={() => {
            setShowConfirmModal(false);
          }}
        />
      )}
    </>
  );
};

export default Reservation;
