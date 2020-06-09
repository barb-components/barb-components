import {CarouselState} from './Carousel.types';

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

export default {getThreshold, isForwards, stateReducer};
