import { FC } from 'react';
import { createPortal } from 'react-dom';

interface ModalWrapperProps {
  children: React.ReactNode;
}

const ModalWrapper: FC<ModalWrapperProps> = ({ children }) => {
  if (window === undefined) return null;
  const modalId = document.getElementById('modal');
  return <>{createPortal(children, modalId!)}</>;
};

export default ModalWrapper;
