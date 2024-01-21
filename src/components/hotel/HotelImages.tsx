import { FC, useState } from 'react';
import Image from 'next/image';
import ModalWrapper from '../ui/ModalWrapper';
import HotelDetailModal from './HotelDetailModal';

interface HotelImagesProps {
  images: string[];
  name: string;
}

const HotelImages: FC<HotelImagesProps> = ({ images, name }) => {
  const [showModal, setShowModal] = useState({
    show: false,
    index: 0,
  });
  const mainImage = images[0];
  const otherImages = images.slice(1, 5);
  return (
    <>
      <div className="flex gap-3">
        <div
          onClick={() => setShowModal({ show: true, index: 0 })}
          className="group cursor-pointer relative basis-1/2 h-[400px rounded-l-lg overflow-hidden"
        >
          <Image src={mainImage ?? ''} priority alt="hotel detail" fill />
          <div className="absolute inset-0 bg-neutral-700 opacity-0 hover:opacity-30 ease-in-out"></div>
        </div>
        <div className="basis-1/2 h-[400px] grid grid-cols-2 gap-2">
          {otherImages.map((_, index) => (
            <div
              onClick={() =>
                setShowModal({
                  show: true,
                  index: index + 1,
                })
              }
              key={index}
              className="group cursor-pointer relative"
            >
              <Image
                src={`/images/detail/hotel/detail${index + 2}.jpg`}
                alt="hotel detail"
                fill
              />
              <div className="absolute inset-0 bg-neutral-700 opacity-0 hover:opacity-30 ease-in-out"></div>
            </div>
          ))}
        </div>
      </div>
      {showModal.show && (
        <ModalWrapper>
          <HotelDetailModal
            initalIndex={showModal.index}
            name={name}
            images={images}
            closeModal={() => setShowModal({ show: false, index: 0 })}
          />
        </ModalWrapper>
      )}
    </>
  );
};

export default HotelImages;
