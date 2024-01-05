import { FC } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';

interface CarouselButtonsProps {
  previous: () => void;
  next: () => void;
}

const CarouselButtons: FC<CarouselButtonsProps> = ({ previous, next }) => {
  return (
    <>
      <div className="absolute -left-4 top-1/2 -translate-y-24">
        <button
          onClick={previous}
          className="bg-white p-3 rounded-full shadow-lg"
        >
          <IoIosArrowBack size={20} />
        </button>
      </div>
      <div className="absolute -right-4 top-1/2 -translate-y-24">
        <button onClick={next} className="bg-white p-3 rounded-full shadow-lg">
          <IoIosArrowForward size={20} />
        </button>
      </div>
    </>
  );
};

export default CarouselButtons;
