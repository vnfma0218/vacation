'use client';
import { FC, useState } from 'react';
import { addDays } from 'date-fns';
import { DateRangePicker, Range } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { ko } from 'date-fns/locale';
import { useOutsideClick } from '@/app/hooks/useOutsideClick';

interface MonthRangePickerProps {
  selectDate: (startDate: Date, endDate: Date) => void;
  closeDatePicker: (e?: MouseEvent) => void;
  btnRef: React.RefObject<HTMLButtonElement>;
}

const MonthRangePicker: FC<MonthRangePickerProps> = ({
  closeDatePicker,
  selectDate,
}) => {
  const ref = useOutsideClick((e) => {
    closeDatePicker(e);
  });
  const [state, setState] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection',
    },
  ]);

  return (
    <div className="absolute bg-white" ref={ref}>
      <DateRangePicker
        locale={ko}
        staticRanges={[]}
        inputRanges={[]}
        onChange={(item) => {
          if (item.selection.endDate !== item.selection.startDate) {
            selectDate(item.selection.startDate!, item.selection.endDate!);
            closeDatePicker();
          }
          setState([item.selection]);
        }}
        months={2}
        ranges={state}
        direction="horizontal"
      />
      ;
    </div>
  );
};

export default MonthRangePicker;
