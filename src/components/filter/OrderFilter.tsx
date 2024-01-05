import { Dispatch, SetStateAction, forwardRef } from 'react';
import { LuArrowDownUp } from 'react-icons/lu';
import { HOTEL_SORT } from '@/lib/constant';
import { FaCheck } from 'react-icons/fa6';

interface OrderFilterProps {
  setShowSort: Dispatch<SetStateAction<boolean>>;
  selectedSort: string;
  showSort: boolean;
  onSelectSort: (sort: { label: string; value: string }) => void;
}

const OrderFilter = forwardRef<HTMLDivElement, OrderFilterProps>(
  ({ setShowSort, selectedSort, showSort, onSelectSort }, ref) => {
    return (
      <div ref={ref} className="flex items-center relative">
        <LuArrowDownUp
          onClick={() => setShowSort((prev) => !prev)}
          className="cursor-pointer"
        />
        <p
          onClick={() => setShowSort((prev) => !prev)}
          className="ml-2 cursor-pointer"
        >
          {selectedSort}
        </p>
        {showSort && (
          <div className="absolute top-8 right-0 bg-white shadow-md w-44 text-sm rounded-md">
            {HOTEL_SORT.map((sort) => {
              if (sort.label === selectedSort) {
                return (
                  <div
                    key={sort.value}
                    onClick={() => onSelectSort(sort)}
                    className="flex justify-between items-center"
                  >
                    <p className="py-2 px-5 cursor-pointer text-[#1273E4]">
                      {sort.label}
                    </p>
                    <FaCheck className="mr-4" color={'#1273E4'} />
                  </div>
                );
              }
              return (
                <p
                  key={sort.value}
                  onClick={() => onSelectSort(sort)}
                  className="py-2 px-5 cursor-pointer hover:bg-gray-300"
                >
                  {sort.label}
                </p>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);
OrderFilter.displayName = 'OrderFilter';

export default OrderFilter;
