import {Dispatch} from 'react';

import {jumpSlides} from './index';
import {CarouselAction, CarouselSlideProps, CarouselState} from './types';

export type NextSlidesReducer = (props: {
  oldIndex: number;
  currentIndex: number;
  action: CarouselAction;
  allSlides: CarouselSlideProps[];
  carouselSlides: CarouselSlideProps[];
  dispatchState: Dispatch<Partial<CarouselState>>;
}) => number;

const nextSlideReducer: NextSlidesReducer = ({
  oldIndex,
  currentIndex,
  action,
  allSlides,
  carouselSlides,
  dispatchState,
}) => {
  const length = allSlides.length;
  const {type, next: jumpIndex = 0, play = false} = action;
  const prev = (length + currentIndex - 1) % length;
  const next = (currentIndex + 1) % length;
  const isSkip = jumpIndex !== prev && jumpIndex !== next;

  let newIndex: number = oldIndex;

  switch (type) {
    case 'prev':
      newIndex = prev;
      break;
    case 'next':
      newIndex = next;
      break;
    case 'jump':
      newIndex = jumpIndex;
      isSkip &&
        jumpSlides({
          currentIndex,
          newIndex: jumpIndex,
          carouselSlides,
          allSlides,
          dispatchState,
        });
      break;
    case 'play':
      dispatchState({play});
  }

  return newIndex;
};

export default nextSlideReducer;
