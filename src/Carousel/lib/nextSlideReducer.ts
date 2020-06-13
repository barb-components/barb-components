import {Dispatch} from 'react';

import styles from '../styles/carousel.module.scss';
import {isForwards} from './helpers';
import {CarouselAction, CarouselSlideProps, CarouselState} from './types';

export type NextSlidesReducer = (props: {
  lastIndex: number;
  currentIndex: number;
  length: number;
  action: CarouselAction;
  allSlides: CarouselSlideProps[];
  carouselSlides: CarouselSlideProps[];
  dispatchState: Dispatch<Partial<CarouselState>>;
}) => number;

const nextSlideReducer: NextSlidesReducer = ({
  lastIndex,
  currentIndex,
  length,
  action,
  allSlides,
  carouselSlides,
  dispatchState,
}) => {
  const {type, next: nextIndex = 0, play = false} = action;
  const [, two, three, four] = carouselSlides || [];
  const prev = (length + currentIndex - 1) % length;
  const next = (currentIndex + 1) % length;
  const isSkip = nextIndex !== prev && nextIndex !== next;
  const slideForwards = isForwards(currentIndex, nextIndex, length);
  const nextNextIndex = slideForwards
    ? (nextIndex + 1) % length
    : (length + nextIndex - 1) % length;

  switch (type) {
    case 'prev':
      return prev;
    case 'next':
      return next;
    case 'jump':
      if (isSkip) {
        const nextSlide: CarouselSlideProps = {
          ...allSlides[nextIndex],
          uuid: `next-${allSlides[nextIndex].uuid}`,
        };
        const nextNextSlide = {
          ...allSlides[nextNextIndex],
          uuid: `next-next-${allSlides[nextNextIndex].uuid}`,
        };
        const directionClass = slideForwards
          ? styles.backwards
          : styles.forwards;
        const slidingClass = `${directionClass}`;

        dispatchState({
          slides: slideForwards
            ? [two, three, four, nextSlide, nextNextSlide]
            : [nextNextSlide, nextSlide, two, three, four],
          slidingClass,
        });
      }
      return nextIndex;
    case 'play':
      dispatchState({play});
      return lastIndex;
  }
};

export default nextSlideReducer;
