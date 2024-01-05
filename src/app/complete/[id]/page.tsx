import { FC } from 'react';

interface pageProps {
  params: {
    id: string;
  };
}

const page: FC<pageProps> = ({ params: { id } }) => {
  return (
    <div className="flex flex-col justify-start mx-auto max-w-[600px] mt-20">
      <h1 className="text-3xl">예약 완료</h1>
      <p className="text-2xl mt-4">예약 번호</p>
      <p className="text-2xl p-2 rounded-lg mt-4 bg-gray-300">{id}</p>
      <p className="mt-5">위 예약번호로 예약 확인이 가능합니다</p>
      <p>(예약번호는 다시 찾을 수 없습니다)</p>
    </div>
  );
};

export default page;
