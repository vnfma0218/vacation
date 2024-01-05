'use client';
import { FC, useState } from 'react';
import { Button } from './ui/Button';
import BackButton from './ui/BackButton';
import { useRouter } from 'next/navigation';

interface ReservationSearchProps {}

const ReservationSearch: FC<ReservationSearchProps> = ({}) => {
  const router = useRouter();
  const [confirmId, setConfirmId] = useState<string>('');
  const [error, setError] = useState<string>('');
  const onSearch = () => {
    if (confirmId.trim().length === 0) {
      setError('예약번호를 입력해주세요');
      return;
    }
    router.push(`/reservation/${confirmId}`);
  };
  return (
    <>
      <div className="flex items-center text-3xl font-semibold">
        <BackButton />
        <span className="ml-5">예약 조회</span>
      </div>

      <div className="flex mt-10 items-center">
        <p className="text-2xl mr-5">예약번호: </p>
        <input
          value={confirmId}
          onChange={(e) => setConfirmId(e.target.value)}
          type="text"
          className={`mt-1 w-80 rounded-lg border px-2 py-3 bg-gray-100 
          hover:bg-gray-200 focus:bg-white focus:border-black focus:outline-none
          ${error ? 'border-red-400 focus:border-red-400' : 'border'}
          `}
          placeholder="예약번호를 입력해주세요"
        />
      </div>
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
      <Button onClick={onSearch} className="mt-10" size={'lg'}>
        조회
      </Button>
    </>
  );
};

export default ReservationSearch;
