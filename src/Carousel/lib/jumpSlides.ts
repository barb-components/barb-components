import {Dispatch} from 'react';

import styles from '../styles/carousel.module.scss';
import {isForwards} from './helpers';
import {CarouselSlideProps, CarouselState} from './types';

export type DoStuffWithSlides = (props: {
  currentIndex: number;
  newIndex: number;
  carouselSlides: CarouselSlideProps[];
  allSlides: CarouselSlideProps[];
  dispatchState: Dispatch<Partial<CarouselState>>;
}) => void;
const jumpSlides: DoStuffWithSlides = ({
  currentIndex,
  newIndex,
  carouselSlides,
  allSlides,
  dispatchState,
}) => {
  const length = allSlides.length;
  const [, two, three, four] = carouselSlides || [];
  const slideForwards = isForwards(currentIndex, newIndex, length);
  const jumpPrevIndex = (length + newIndex - 1) % length;
  const jumpNextIndex = (newIndex + 1) % length;
  const {uuid: prevUuid, slide: prevSlide} = allSlides[jumpPrevIndex];
  const {uuid: newUuid, slide: newSlide} = allSlides[newIndex];
  const {uuid: nextUuid, slide: nextSlide} = allSlides[jumpNextIndex];

  const prev: CarouselSlideProps = {
    uuid: `prev-${prevUuid}`,
    slide: prevSlide,
  };
  const jump = {
    uuid: `new-${newUuid}`,
    slide: newSlide,
  };
  const next = {
    uuid: `next-${nextUuid}`,
    slide: nextSlide,
  };
  const directionClass = slideForwards ? styles.forwards : styles.backwards;
  const slidingClass = `${directionClass}`;

  dispatchState({
    slides: slideForwards
      ? [two, three, four, prev, jump, next]
      : [prev, jump, next, two, three, four],
    slidingClass,
  });
};
export default jumpSlides;
