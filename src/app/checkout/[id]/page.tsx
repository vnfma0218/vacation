import Reservation from '@/components/Reservation';
import { FC } from 'react';

interface pageProps {
  params: {
    id: string;
  };
}

const page: FC<pageProps> = ({ params }) => {
  return (
    <main className="max-w-6xl mx-auto px-10 mt-10">
      <div className="flex gap-10">
        <Reservation hotelId={params.id} />
      </div>
    </main>
  );
};

export default page;
