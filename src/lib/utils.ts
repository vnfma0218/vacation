import { ClassValue, clsx } from 'clsx';
import { differenceInDays, format, getDay } from 'date-fns';
import { twMerge } from 'tailwind-merge';
import { WEEKDAY } from './constant';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCategoryName(category: string): string {
  switch (category) {
    case 'resort':
      return '리조트';
    case 'aprtment':
      return '아파트';
    default:
      return '호텔';
  }
}

export function getDiffereceDate(date1: Date, date2: Date) {
  return differenceInDays(date1, date2);
}

export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function getFormatDate(date: Date) {
  return `${format(date, 'MM.dd')} ${WEEKDAY[getDay(date)]}`;
}
