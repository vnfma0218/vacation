import { FC } from 'react';
import ModalWrapper from './ModalWrapper';
import { Button } from './Button';

interface ConfirmModalProps {
  closeModal: () => void;
  onConfirm: () => void;
  modalMessage: string;
  headerMessage?: string;
  isLoading?: boolean;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  headerMessage = '확인',
  modalMessage,
  closeModal,
  onConfirm,
  isLoading,
}) => {
  const backdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <ModalWrapper>
      <div
        onClick={backdropClick}
        className="bg-gray-500 bg-opacity-45 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full"
      >
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-2xl bg-white p-5 min-w-[300px]">
          <div className="border-b pb-2">
            <p className="text-xl">{headerMessage}</p>
          </div>
          <p className="text-lg mt-5">{modalMessage}</p>
          <div className="mt-10 flex justify-end">
            <Button onClick={() => closeModal()} className="mr-3">
              취소
            </Button>
            <Button
              isLoading={isLoading}
              onClick={() => {
                onConfirm();
              }}
            >
              확인
            </Button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ConfirmModal;
