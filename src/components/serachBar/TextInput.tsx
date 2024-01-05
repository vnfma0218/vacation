import { Dispatch, FC, SetStateAction, useState } from 'react';

import { IoMdClose } from 'react-icons/io';
import { useOutsideClick } from '@/app/hooks/useOutsideClick';
import { LocationSelect } from '../LocationSelect';

interface SearchBarTextInputProps {
  error: boolean;
  text: string;
  setText: (text: string) => void;
}

const SearchBarTextInput: FC<SearchBarTextInputProps> = ({
  setText,
  text,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const ref = useOutsideClick((e) => {
    const target = e.target as HTMLElement;
    if (target.id === 'searchInput') return;
    setIsFocused(false);
  });
  const clearTextInput = () => {
    setText('');
  };
  const selectLocation = (location: string) => {
    setText(location);
    setIsFocused(false);
  };
  return (
    <div
      className="relative rounded-md shadow-sm mr-2
     min-[900px]:basis-1/3 max-[900px]:w-full max-[900px]:mb-3
     "
    >
      {error && (
        <div className="absolute bottom-12 bg-black bg-opacity-85 p-2 rounded-lg overflow-hidden">
          <p className="text-white text-sm ">목적지를 입력해주세요</p>
        </div>
      )}

      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <span className="text-gray-500 sm:text-sm">🔎</span>
      </div>
      <span
        onClick={() => setIsFocused(true)}
        className="cursor-pointer block w-full rounded-md border-0 py-2.5 pl-9 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >
        {text.trim().length < 1 ? '여행지를 선택하세요' : text}
      </span>
      {/* <input
        autoComplete="off"
        onFocus={() => setIsFocused(true)}
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
        name="searchInput"
        id="searchInput"
        className="block w-full rounded-md border-0 py-2.5 pl-9 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="여행지를 선택하세요"
      /> */}
      {text.trim().length > 0 && (
        <div className="absolute inset-y-0 right-5 flex items-center pl-3">
          <button
            onClick={clearTextInput}
            className="bg-gray-400 rounded-full p-[1px] cursor-pointer"
          >
            <IoMdClose size={16} color="white" />
          </button>
        </div>
      )}
      {isFocused && (
        <LocationSelect ref={ref} selectLocation={selectLocation} />
      )}
    </div>
  );
};

export default SearchBarTextInput;
