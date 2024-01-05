'use client';
import { FC, useState } from 'react';
import Slider from 'rc-slider';
import { numberWithCommas } from '@/lib/utils';
import { GrPowerReset } from 'react-icons/gr';
import 'rc-slider/assets/index.css';

interface PriceFilterProps {
  changePrice: (price: number[]) => void;
  price: {
    min: number;
    max: number;
  };
  isPriceLimited: boolean;
}

const PriceFilter: FC<PriceFilterProps> = ({ changePrice, price }) => {
  const [minPrice, setMinPrice] = useState<number>(price.min);
  const [maxPrice, setMaxPrice] = useState<number>(price.max);
  const isDefaultValue = price.min === 0 && price.max === 500000;
  return (
    <div className="border-t mt-5">
      <div className="mt-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <p className="text-lg font-semibold mr-3">가격</p>
            <p className="text-xs text-gray-400">1박기준</p>
          </div>
          <div
            onClick={() => {
              if (isDefaultValue) return;
              const initialValue = [0, 500000];
              changePrice(initialValue);
              setMinPrice(initialValue[0]);
              setMaxPrice(initialValue[1]);
            }}
            className={`flex ${
              isDefaultValue
                ? 'cursor-not-allowed text-gray-300'
                : 'cursor-pointer hover:text-gray-400'
            }  items-center `}
          >
            <GrPowerReset size={14} />
            <span
              className={`ml-1 text-sm ${!isDefaultValue && 'hover:underline'}`}
            >
              초기화
            </span>
          </div>
        </div>

        <div className="mt-5 px-1">
          <Slider
            range
            value={[minPrice, maxPrice]}
            defaultValue={[price.min, price.max]}
            min={0}
            allowCross={false}
            max={500000}
            pushable={100000}
            step={100000}
            onChange={(value) => {
              const val = value as number[];
              setMinPrice(val[0]);
              setMaxPrice(val[1]);
            }}
            onChangeComplete={(value) => {
              const val = value as number[];
              changePrice(val);
            }}
          />
        </div>
        <p className="mt-2 text-sm text-blue-500">{`${numberWithCommas(
          minPrice
        )}원 ~ ${numberWithCommas(maxPrice)}원`}</p>
      </div>
    </div>
  );
};

export default PriceFilter;
