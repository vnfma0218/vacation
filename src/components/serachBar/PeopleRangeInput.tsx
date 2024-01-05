import { useOutsideClick } from '@/app/hooks/useOutsideClick';
import { FC, useState } from 'react';
import { FaMinus } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import { IoMdPerson } from 'react-icons/io';

interface PeopleRangeInputProps {
  people: number;
  setPeople: (people: number) => void;
}

const PeopleRangeInput: FC<PeopleRangeInputProps> = ({ people, setPeople }) => {
  const [showRangeBox, setShowRangeBox] = useState(false);
  const ref = useOutsideClick(() => {
    setShowRangeBox(false);
  });
  const addPeople = () => {
    setPeople(people + 1);
  };
  const deductPeople = () => {
    setPeople(people === 1 ? 1 : people - 1);
  };
  return (
    <div className="relative min-[900px]:ml-2 min-[900px]:basis-1/4 max-[900px]:w-full max-[900px]:mb-3">
      <button
        onClick={() => setShowRangeBox(true)}
        className="pl-7 text-start block w-full rounded-md border-0 py-2.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 basis-1/4 mr-2"
      >
        <div className="flex items-center">
          <IoMdPerson size={20} />
          <p className="ml-2">{`인원 ${people}`}</p>
        </div>
      </button>
      {showRangeBox && (
        <div
          ref={ref}
          className="absolute px-6 py-3 w-[360px] bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] top-14  border rounded-lg"
        >
          <div className="py-2 flex">
            <div className="basis-1/2">
              <p className="font-semibold">인원</p>
              <p className="text-xs text-gray-400">
                유아 및 아동도 인원수에 <br />
                포함해주세요.
              </p>
            </div>
            <div className="flex items-center basis-1/2 justify-center">
              <button
                onClick={deductPeople}
                disabled={people === 1}
                className={`border border-gray-300 rounded-full p-2 mr-3 ${
                  people === 1 ? 'cursor-not-allowed' : ''
                }`}
              >
                <FaMinus color={`${people === 1 ? 'gray' : ''}`} />
              </button>
              <p>{people}</p>
              <button
                onClick={addPeople}
                className="border border-gray-300 rounded-full p-2 ml-3"
              >
                <FaPlus />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PeopleRangeInput;
