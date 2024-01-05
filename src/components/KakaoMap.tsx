'use client';
import { useEffect, useRef } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useKakaoLoader from './useKakaoLoader';
declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  latitude?: number;
  longitude?: number;
}

export default function KakaoMap({ latitude, longitude }: MapProps) {
  useKakaoLoader();
  return (
    <Map
      id="map"
      center={{
        // 지도의 중심좌표
        lat: latitude ?? 33.450701,
        lng: longitude ?? 126.570667,
      }}
      style={{
        // 지도의 크기
        width: '100%',
        height: '250px',
      }}
      level={4} // 지도의 확대 레벨
    >
      <MapMarker // 마커를 생성합니다
        position={{
          // 마커가 표시될 위치입니다
          lat: latitude ?? 33.450701,
          lng: longitude ?? 126.570667,
        }}
        image={{
          src: '/images/icons/map-marker.svg', // 마커이미지의 주소입니다
          size: {
            width: 44,
            height: 49,
          }, // 마커이미지의 크기입니다
          options: {
            offset: {
              x: 20,
              y: 39,
            }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
          },
        }}
      />
    </Map>
  );
}
