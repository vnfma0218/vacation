import { getLocations } from '@/services/category';

import { forwardRef, ReactNode } from 'react';
import useSWR from 'swr';

interface LocationSelectProps {
  selectLocation: (location: string) => void;
}
export type Ref = HTMLDivElement;

export const LocationSelect = forwardRef<Ref, LocationSelectProps>(
  (props, ref) => {
    const { selectLocation } = props;
    const { data: locations, isLoading } = useSWR<
      { id: string; title: string }[]
    >(`/api/locations`, () => getLocations());
    return (
      <div
        ref={ref}
        className="max-[900px]:z-40 absolute bg-white p-2 w-full shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] top-14 max-h-80 border rounded-lg overflow-y-scroll px-2 pb-4"
      >
        <p className="font-bold mt-3 px-2">지역 목록</p>
        <ul className="mt-4">
          {locations?.map((location, index) => (
            <li
              onClick={() => selectLocation(location.title)}
              key={location.id}
              className="cursor-pointer hover:bg-neutral-100 p-2 rounded-lg pr-3"
            >
              <span className="mr-6">{index + 1}</span>
              <span className="text-gray-500">{location.title}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

// const LocationSelect: FC<LocationSelectProps> = ({ selectLocation }) => {
//   const { data: locations, isLoading } = useSWR<
//     { id: string; title: string }[]
//   >(`/api/locations`, () => getLocations());
//   return (
//     <div className="absolute bg-white p-2 w-full shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] top-14 max-h-80 border rounded-lg overflow-y-scroll px-2 pb-4">
//       <p className="font-bold mt-3 px-2">지역 목록</p>
//       <ul className="mt-4">
//         {locations?.map((location, index) => (
//           <li
//             onClick={() => selectLocation(location.title)}
//             key={location.id}
//             className="cursor-pointer hover:bg-neutral-100 p-2 rounded-lg pr-3"
//           >
//             <span className="mr-6">{index + 1}</span>
//             <span className="text-gray-500">{location.title}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default LocationSelect;
