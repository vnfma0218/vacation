'use client';
import { FC, useContext, useEffect, useState } from 'react';
import { Button } from '../ui/Button';
import TextInput from './TextInput';
import DateRangeInput from './DateRangeInput';
import PeopleRangeInput from './PeopleRangeInput';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { CheckoutContext } from '@/context/CheckoutInfoContext';

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = ({}) => {
  const { checkoutInfo, setCheckoutInfo } = useContext(CheckoutContext);
  const router = useRouter();

  const [error, setError] = useState(false);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }, [error]);

  const onSearch = () => {
    const text = checkoutInfo.keyword;
    const people = checkoutInfo.personal;
    const checkIn = format(checkoutInfo.checkIn, 'yyyy-MM-dd');
    const checkOut = format(checkoutInfo.checkOut, 'yyyy-MM-dd');

    if (text.trim().length === 0) {
      setError(true);
      return;
    }

    router.push(
      `/search?keyword=${text}&searchType=KEYWORD&checkIn=${checkIn}&checkOut=${checkOut}&personal=${people}`
    );
  };

  const onChangeDates = (dates: Date[]) => {
    setCheckoutInfo({ ...checkoutInfo, checkIn: dates[0], checkOut: dates[1] });
  };

  const onChangeKeyword = (text: string) => {
    setCheckoutInfo({ ...checkoutInfo, keyword: text });
  };

  const onChangePeople = (people: number) => {
    setCheckoutInfo({ ...checkoutInfo, personal: people });
  };

  return (
    <div
      className="w-full bg-white mt-14 p-5 rounded-lg flex items-center
     max-[900px]:flex-col max-[900px]:items-start max-[900px]:mt-5"
    >
      <TextInput
        text={checkoutInfo.keyword}
        setText={onChangeKeyword}
        error={error}
      />
      <DateRangeInput
        selectedDate={[checkoutInfo.checkIn, checkoutInfo.checkOut]}
        setSelectedDate={onChangeDates}
      />
      <PeopleRangeInput
        people={checkoutInfo.personal}
        setPeople={onChangePeople}
      />
      <Button
        onClick={onSearch}
        className="min-[900px]:ml-2 flex-1
      max-[900px]:w-full max-[900px]:py-3
      "
        size={'lg'}
      >
        검색
      </Button>
    </div>
  );
};

export default SearchBar;
