import HotelDetail from '@/components/hotel/HotelDetail';
import { FC } from 'react';

interface pageProps {
  params: {
    id: string;
  };
}

const page: FC<pageProps> = ({ params: { id } }) => {
  return (
    <main className="max-w-6xl mx-auto px-10 pt-5">
      <HotelDetail id={id} />
    </main>
  );
};

export default page;
