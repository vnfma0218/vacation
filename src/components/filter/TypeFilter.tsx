'use client';
import { FC } from 'react';
import useSWR from 'swr';
import { HotelCategory } from '@/models/hotel';
import { getCategoryList } from '@/services/category';

interface TypeFilterProps {
  type: string;
  changeType: (type: string) => void;
}

type FilterCategory = Pick<HotelCategory, 'id' | 'title'>;

const TypeFilter: FC<TypeFilterProps> = ({ type, changeType }) => {
  const { data: categories } = useSWR<HotelCategory[]>(
    '/api/hotels/category',
    () => getCategoryList()
  );
  let allCategory: FilterCategory[] = [];
  if (categories) {
    allCategory = [{ id: '0', title: '전체' }, ...categories];
  }
  return (
    <div className="border-t mt-5">
      <p className="mt-5 font-semibold">숙소유형</p>
      {allCategory?.map((category) => (
        <div key={category.id} className="flex items-center mt-5">
          <label
            className="relative flex items-center rounded-full cursor-pointer"
            htmlFor={category.title}
          >
            <input
              value={type}
              onChange={(e) => {
                changeType(e.target.id);
              }}
              checked={type === category.title}
              name="category"
              type="radio"
              className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-600 checked:before:bg-blue-600 hover:before:opacity-10"
              id={category.title}
            />
            <span className="absolute text-blue-600 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
              </svg>
            </span>
          </label>
          <label htmlFor={category.title} className="ml-3">
            {category.title}
          </label>
        </div>
      ))}
    </div>
  );
};

export default TypeFilter;
