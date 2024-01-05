'use client';
import { VISIT_TYPE } from '@/lib/constant';
import { FC } from 'react';

interface ReservationFormProps {
  error: {
    name: string;
    visitType: string;
  };
  name: string;
  visitType: string;
  changeVisitType: (value: string) => void;
  changeName: (value: string) => void;
}

const ReservationForm: FC<ReservationFormProps> = ({
  error,
  name,
  visitType,
  changeName,
  changeVisitType,
}) => {
  return (
    <div className="mt-5">
      <h2 className="font-semibold text-lg">예약자 정보</h2>
      <div className="mt-5">
        <label className="block text-sm text-gray-500" htmlFor="name">
          예약자 이름
        </label>
        <input
          value={name}
          onChange={(e) => changeName(e.target.value)}
          type="text"
          className={`mt-1 w-80 rounded-lg border px-2 py-3 bg-gray-100 
          hover:bg-gray-200 focus:bg-white focus:border-black focus:outline-none
          ${error.name ? 'border-red-400 focus:border-red-400' : 'border'}
          `}
          placeholder="홍길동"
        />
        {error.name && (
          <p className="text-red-400 text-sm mt-1">{error.name}</p>
        )}
      </div>
      <div className="mt-5">
        <p className="block text-sm text-gray-500">방문 방법</p>
        {VISIT_TYPE.map((visit) => (
          <div key={visit.value} className="flex items-center mt-5">
            <label
              className="relative flex items-center rounded-full cursor-pointer"
              htmlFor={visit.value}
            >
              <input
                value={visit.value}
                name={visit.value}
                type="radio"
                onChange={(e) => {
                  changeVisitType(e.target.value);
                }}
                checked={visitType === visit.value}
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-600 checked:before:bg-blue-600 hover:before:opacity-10"
                id={visit.value}
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
            <label htmlFor={visit.value} className="ml-3">
              {visit.label}
            </label>
          </div>
        ))}
        {error.visitType && (
          <p className="text-red-400 text-sm mt-2">{error.visitType}</p>
        )}
      </div>
    </div>
  );
};

export default ReservationForm;
