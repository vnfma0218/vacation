import { FC, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import OrderFilter from './filter/OrderFilter';
import { useOutsideClick } from '@/app/hooks/useOutsideClick';

interface SearchHeaderProps {
  resultCnt: number;
  changeOrder: (sort: string) => void;
}

const SearchHeader: FC<SearchHeaderProps> = ({ changeOrder, resultCnt }) => {
  const [showSort, setShowSort] = useState(false);
  const [selectedSort, setSelectedSort] = useState('추천순');
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword');
  const ref = useOutsideClick(() => setShowSort(false));

  const onSelectSort = (sort: { label: string; value: string }) => {
    setSelectedSort(sort.label);
    setShowSort(false);
    changeOrder(sort.value);
  };

  return (
    <header className="flex justify-between items-center mb-10">
      <p className="text-2xl font-bold">{`'${keyword}' 숙소 ${resultCnt}개`}</p>
      <OrderFilter
        ref={ref}
        selectedSort={selectedSort}
        onSelectSort={onSelectSort}
        setShowSort={setShowSort}
        showSort={showSort}
      />
    </header>
  );
};

export default SearchHeader;
