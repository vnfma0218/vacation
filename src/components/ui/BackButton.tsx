'use client';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';

const BackButton: FC = ({}) => {
  const router = useRouter();
  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        router.back();
      }}
    >
      <FaArrowLeft size={20} />
    </div>
  );
};

export default BackButton;
