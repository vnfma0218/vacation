'use client';
import { FC, useCallback, useRef } from 'react';
import Slider, { LazyLoadTypes } from 'react-slick';
import CarouselButtons from './ui/CarouselButtons';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
interface CarouselWrapperProps {
  slidesToScroll?: number;
  children: React.ReactNode;
  beforeChange?(currentSlide: number, nextSlide: number): void;
  afterChange?(currentSlide: number): void;
}

function SampleNextArrow(props: { className: any; style: any; onClick: any }) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className}`}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    ></div>
  );
}

const CarouselWrapper: FC<CarouselWrapperProps> = ({
  slidesToScroll = 2,
  children,
  beforeChange,
  afterChange,
}) => {
  const slickRef = useRef<Slider | null>(null);
  const previous = useCallback(() => slickRef?.current!.slickPrev(), []);
  const next = useCallback(() => slickRef?.current!.slickNext(), []);

  const settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll,
    arrows: false,
    swipeToSlide: false,
    swipe: false,

    lazyLoad: 'ondemand' as LazyLoadTypes,
    nextArrow: (
      <SampleNextArrow
        className={undefined}
        style={undefined}
        onClick={undefined}
      />
    ),
    // prevArrow: <SamplePrevArrow />
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 850,
        settings: {
          swipe: true,
          swipeToSlide: true,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          swipe: true,
          swipeToSlide: true,
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="relative">
      <Slider
        {...settings}
        ref={slickRef}
        beforeChange={beforeChange}
        afterChange={afterChange}
      >
        {children}
      </Slider>
      <CarouselButtons previous={previous} next={next} />
    </div>
  );
};

export default CarouselWrapper;
