'use client';
import Image from 'next/image';
import { FC, useCallback, useEffect, useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import Slider from 'react-slick';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface HotelDetailModalProps {
  initalIndex: number;
  images: string[];
  name: string;
  closeModal: () => void;
}

const HotelDetailModal: FC<HotelDetailModalProps> = ({
  images,
  name,
  initalIndex,
  closeModal,
}) => {
  const slickRef = useRef<Slider | null>(null);
  const previous = useCallback(() => slickRef?.current!.slickPrev(), []);
  const next = useCallback(() => slickRef?.current!.slickNext(), []);

  const settings = {
    dots: true,
    infinite: true,
    adaptiveHeight: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const backdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    if (slickRef.current) {
      slickRef.current.slickGoTo(initalIndex, true);
    }
  }, [slickRef]);

  return (
    <div
      onClick={backdropClick}
      className="bg-gray-500 bg-opacity-45 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full"
    >
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-2xl bg-white max-h-[1200px] h-[90%] w-[90%] max-w-6xl">
        <div className="flex flex-col h-full">
          <div className="p-3">
            <button onClick={() => closeModal()} className="absolute top-4">
              <IoMdClose size={22} />
            </button>
            <h2 className="flex justify-center">{name}</h2>
          </div>
          <div className="mt-10 bg-slate-200 mb-20 w-[100%] mx-auto flex-grow ">
            <div className="flex flex-col justify-center h-full">
              <Slider {...settings} ref={slickRef}>
                {images.map((image, index) => (
                  <div key={image}>
                    <div className="relative mx-auto  w-full h-[540px] max-w-[850px] max-h-[650px] rounded-lg overflow-hidden">
                      <Image
                        src={
                          index === 0
                            ? images[0] ?? ''
                            : `/images/detail/hotel/detail${index + 1}.jpg`
                        }
                        className="object-cover w-full py-5"
                        alt="hotel detail"
                        fill
                      />
                    </div>
                  </div>
                ))}
              </Slider>
              <div className="absolute left-10 top-1/2 -translate-y-1/2">
                <button
                  onClick={previous}
                  className="bg-white p-3 rounded-full shadow-lg"
                >
                  <IoIosArrowBack size={20} />
                </button>
              </div>
              <div className="absolute right-10 top-1/2 -translate-y-1/2">
                <button
                  onClick={next}
                  className="bg-white p-3 rounded-full shadow-lg"
                >
                  <IoIosArrowForward size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailModal;
