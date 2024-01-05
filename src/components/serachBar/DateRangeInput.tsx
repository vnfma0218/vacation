import { FC, useRef, useState } from 'react';
import MonthRangePicker from '../MonthRangePicker';
import { CiCalendar } from 'react-icons/ci';
import { getFormatDate } from '@/lib/utils';

interface DateRangeInputProps {
  selectedDate: Date[];
  setSelectedDate: (dates: Date[]) => void;
}

const DateRangeInput: FC<DateRangeInputProps> = ({
  selectedDate,
  setSelectedDate,
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const closeDatePicker = (e?: MouseEvent) => {
    if (btnRef.current?.contains(e?.target as Node)) return;
    setShowDatePicker(false);
  };

  const selectDate = (startDate: Date, endDate: Date) => {
    setSelectedDate([startDate, endDate]);
  };

  const getDisplayDate = () => {
    return `${getFormatDate(selectedDate[0])} ~ ${getFormatDate(
      selectedDate[1]
    )}`;
  };

  return (
    <div className="min-[900px]:basis-1/4 max-[900px]:w-full max-[900px]:mb-3">
      <button
        ref={btnRef}
        onClick={() => {
          setShowDatePicker(showDatePicker ? false : true);
        }}
        className="text-start pl-3 relative block w-full rounded-md border-0 py-2.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mr-2"
      >
        <div className="flex items-center">
          <CiCalendar size={17} />
          <span className="ml-2">{getDisplayDate()}</span>
        </div>
      </button>
      {showDatePicker && (
        <MonthRangePicker
          btnRef={btnRef}
          selectDate={selectDate}
          closeDatePicker={closeDatePicker}
        />
      )}
    </div>
  );
};

export default DateRangeInput;
