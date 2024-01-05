'use client';
import { useEffect, useState } from 'react';
import Filters from './filter/Filters';
import SearchHeader from './SearchHeader';
import SearchResults from './SearchResults';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { getHotelsByFilters } from '@/services/hotels';
import { Hotel } from '@/models/hotel';

export type Filters = {
  location: string;
  type: string;
  price: {
    min: number;
    max: number;
  };
  isPriceLimited: boolean;

  sort: string;
};
const SearchMain = ({}) => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword');

  const [selectedFilter, setSelectedFilter] = useState<Filters>({
    location: keyword!,
    type: '전체',
    isPriceLimited: false,
    price: {
      min: 0,
      max: 500000,
    },
    sort: 'recommend',
  });

  const { data: hotels, isLoading } = useSWR<Hotel[]>(
    `/api/hotels/byFilter?type=${selectedFilter.type}&order=${
      selectedFilter.sort
    }
${
  selectedFilter.isPriceLimited
    ? `&min=${selectedFilter.price.min}&max=${selectedFilter.price.max}`
    : ``
}
    `,
    () => getHotelsByFilters(keyword!, selectedFilter)
  );

  const onChangeType = (type: string) => {
    setSelectedFilter({
      ...selectedFilter,
      type,
    });
  };
  const onChangeOrder = (sort: string) => {
    setSelectedFilter({
      ...selectedFilter,
      sort,
    });
  };

  const onChangePrice = (price: number[]) => {
    setSelectedFilter((prev) => ({
      ...prev,
      price: {
        min: price[0],
        max: price[1],
      },
      isPriceLimited: true,
    }));
  };

  return (
    <div>
      <SearchHeader
        resultCnt={hotels?.length ?? 0}
        changeOrder={onChangeOrder}
      />
      <div className="flex gap-10">
        <Filters
          changePrice={onChangePrice}
          changeType={onChangeType}
          type={selectedFilter.type}
          price={selectedFilter.price}
          isPriceLimited={selectedFilter.isPriceLimited}
        />
        <SearchResults loading={isLoading} hotels={hotels ?? []} />
      </div>
    </div>
  );
};

export default SearchMain;
