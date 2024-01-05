import { FC } from 'react';
import { FaStar } from 'react-icons/fa';

interface RateStarProps {
  rate: number;
}

const RateStar: FC<RateStarProps> = ({ rate }) => {
  return (
    <div className="inline-flex p-[6px] bg-[#ffad0a] items-center rounded-lg">
      <div className="mr-[4px]">
        <FaStar color="black" size={10} />
      </div>
      <p className="text-xs leading-[0.625]">
        {rate.toString().length < 2 ? `${rate}.0` : rate}
      </p>
    </div>
  );
};
export default RateStar;
