import {Dispatch} from 'react';

import styles from '../styles/carousel.module.scss';
import {isForwards} from './helpers';
import {CarouselSlideProps, CarouselState} from './types';

export type NavigationEffect = (props: {
  current: number;
  next: number;
  length: number;
  dispatchState: Dispatch<Partial<CarouselState>>;
  makeSlides: (index: number) => CarouselSlideProps[];
}) => void;

const navigationEffect: NavigationEffect = ({
  current,
  next,
  length,
  dispatchState,
  makeSlides,
}) => {
  if (current === next) {
    return;
  }

  const slideForwards = isForwards(current, next, length);
  const directionClass = slideForwards ? styles.forwards : styles.backwards;

  dispatchState({
    offset: 0,
    slidingClass: `${styles.slide} ${directionClass}`,
  });
  const id = setTimeout(
    () =>
      dispatchState({
        current: next,
        slides: makeSlides(next),
        slidingClass: '',
      }),
    500
  );

  return () => clearTimeout(id);
};

export default navigationEffect;
