import SearchBar from '@/components/serachBar/SearchBar';
import Image from 'next/image';

const MainSection = () => {
  return (
    <section className="w-full h-[450px] relative">
      <Image priority src={'/images/main.jpg'} alt="main banner" fill />
      <div className="max-w-6xl relative mx-auto">
        <div className="z-40 w-full absolute min-[900px]:top-28 py-10 px-10">
          <div className="">
            <h2 className="font-bold text-white text-3xl">
              여행을 떠나볼까요?
            </h2>
            <h2 className="font-bold text-white text-3xl mt-2">
              숙소를 찾아보세요!
            </h2>
          </div>
          <SearchBar />
        </div>
      </div>
    </section>
  );
};

export default MainSection;
