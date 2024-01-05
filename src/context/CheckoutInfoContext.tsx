'use client';
import { addDays } from 'date-fns';
import { Dispatch, FC, SetStateAction, createContext, useState } from 'react';

interface CheckoutInfoContextProps {
  children: React.ReactNode;
}
type TypeCheckoutInfo = {
  keyword: string;
  checkIn: Date;
  checkOut: Date;
  personal: number;
  hotelId: string;
};

type ContextType = {
  checkoutInfo: TypeCheckoutInfo;
  setCheckoutInfo: Dispatch<SetStateAction<TypeCheckoutInfo>>;
};

const initalValue = {
  keyword: '',
  checkIn: new Date(),
  checkOut: addDays(new Date(), 1),
  personal: 2,
  hotelId: '',
};

export const CheckoutContext = createContext<ContextType>({
  checkoutInfo: initalValue,
  setCheckoutInfo: () => {},
});

const CheckoutInfoContext: FC<CheckoutInfoContextProps> = ({ children }) => {
  const [checkoutInfo, setCheckoutInfo] =
    useState<TypeCheckoutInfo>(initalValue);

  return (
    <CheckoutContext.Provider value={{ checkoutInfo, setCheckoutInfo }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutInfoContext;
