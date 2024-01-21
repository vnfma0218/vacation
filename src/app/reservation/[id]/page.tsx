import MyReservation from '@/components/MyReservation';
import { FC } from 'react';

interface pageProps {
  params: {
    id: string;
  };
}

const page: FC<pageProps> = ({ params: { id } }) => {
  return (
    <main className="max-w-6xl mx-auto px-10 pt-5">
      <MyReservation confirmId={id} />
    </main>
  );
};

export default page;
