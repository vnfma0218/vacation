import HotelDetail from '@/components/hotel/HotelDetail';
import Image from 'next/image';
import { FC } from 'react';

interface pageProps {
  params: {
    id: string;
  };
}

const page: FC<pageProps> = ({ params: { id } }) => {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-10 mt-10">
        <HotelDetail id={id} />
      </div>
    </section>
  );
};

export default page;
