import { FC, useState } from 'react';
import ModalWrapper from './ui/ModalWrapper';
import { Button } from './ui/Button';

interface ReviewModalProps {
  show: boolean;
  closeModal: () => void;
  hotelId: string;
  confirmId: string;
  name: string;
}

async function onAddReview(
  hotelId: string,
  confirmNumber: string,
  comment: string,
  name: string,
  rate: number
) {
  return fetch(`/api/hotel/review`, {
    method: 'POST',
    body: JSON.stringify({ hotelId, confirmNumber, comment, name, rate }),
  }).then((res) => res.json());
}

const ReviewModal: FC<ReviewModalProps> = ({
  show,
  closeModal,
  hotelId,
  name,
  confirmId,
}) => {
  const [review, setReview] = useState('');
  const [rate, setRate] = useState(5);
  const [hoveredRate, setHoveredRate] = useState<number | null>(null);

  const onCloseModal = () => {
    setReview('');
    setRate(5);
    closeModal();
  };

  const backdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };

  const submitReview = () => {
    onAddReview(hotelId, confirmId, review, name, rate);
  };
  return (
    <ModalWrapper>
      <div
        onClick={backdropClick}
        className={`${
          show
            ? 'bg-gray-500 bg-opacity-45 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full'
            : 'hidden'
        } `}
      >
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-2xl bg-white p-5 min-w-[500px]">
          <div className="border-b pb-2">
            <p className="text-xl">리뷰 작성</p>
          </div>
          <div className="mt-4 text-center">
            <div
              className="inline-flex justify-center"
              onMouseLeave={() => {
                setHoveredRate(null);
              }}
            >
              {[...Array(5)].map((_, i) => {
                let isFilled =
                  hoveredRate !== null ? hoveredRate > i : rate > i;
                return (
                  <svg
                    key={i}
                    onMouseOver={() => {
                      setHoveredRate(i + 1);
                    }}
                    onClick={() => {
                      setRate(i + 1);
                    }}
                    className={`w-9 h-9 ${
                      isFilled ? 'text-yellow-300' : 'text-gray-300'
                    } cursor-pointer ms-1`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                );
              })}
              <p className="ml-3 text-sm self-end">{`${rate}/5`}</p>
            </div>
          </div>
          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              리뷰 남기기
            </label>
            <textarea
              value={review}
              onChange={(e) => {
                setReview(e.target.value);
              }}
              id="message"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="이용한 호텔에 대해 리뷰를 남겨주세요"
            ></textarea>
          </div>
          <div className="flex justify-end mt-3">
            <Button
              onClick={() => {
                onCloseModal();
              }}
              className="mr-2"
            >
              닫기
            </Button>
            <Button onClick={submitReview}>제출</Button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ReviewModal;
