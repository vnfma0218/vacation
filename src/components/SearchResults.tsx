import { Hotel } from '@/models/hotel';
import HotelSearchCard from './hotel/HotelSearchCard';
import { PropagateLoader } from 'react-spinners';

type SearchResultsProps = {
  loading: boolean;
  hotels: Hotel[];
};
const SearchResults = ({ hotels, loading }: SearchResultsProps) => {
  return (
    <div className="basis-3/4 h-screen">
      {loading && (
        <div className="text-center mt-14">
          <PropagateLoader color={'red'} />
        </div>
      )}
      {!loading && hotels.length === 0 && (
        <div className="text-center text-xl text-gray-400 font-bold mt-14">
          검색 결과가 없어요
        </div>
      )}
      {hotels.map((hotel, index) => (
        <HotelSearchCard key={hotel.id} hotel={hotel} index={index} />
      ))}
    </div>
  );
};

export default SearchResults;
