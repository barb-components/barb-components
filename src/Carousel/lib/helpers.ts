import {CarouselState} from './types';

export const getThreshold = (target: EventTarget): number => {
  const width = (target as HTMLElement).clientWidth;
  return width / 5;
};

export const isForwards = (
  current: number,
  next: number,
  length: number
): boolean =>
  (next > current && next - current <= length / 2) ||
  (next < current && current - next > length / 2);

export const stateReducer = (
  oldState: CarouselState,
  newState: Partial<CarouselState>
): CarouselState => ({
  ...oldState,
  ...newState,
});

export const preventOrphans = (text: string): string =>
  (text || '').replace(/\s*\n\n\s*/gm, '\n\n').replace(/ ([^ ]*)$/gm, '\xa0$1');

export const truncateString = (
  text = '',
  maxLength = 150,
  ellipsis = '\u2026'
): string => {
  if (!text || text.length <= maxLength) {
    return text;
  }

  const truncatedString = text
    .replace(/\n/gm, ' ')
    .replace(/\s+/gm, ' ')
    .trim()
    .substr(0, text.lastIndexOf(' ', maxLength));

  return `${truncatedString}${ellipsis}`.replace(/\s*[–.,:;].$/gm, ellipsis);
};

export default {
  getThreshold,
  isForwards,
  stateReducer,
  preventOrphans,
  truncateString,
};
