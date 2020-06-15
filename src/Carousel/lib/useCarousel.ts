import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';

import {
  getCarousel,
  getIsForwards,
  getMargin,
  getState,
  GetStateProps,
  getTransform,
} from './helpers';
import {CarouselState, playEffect, slideEffect} from './index';
import {CarouselSlideProps} from './types';

export type UseCarouselProps = {
  show: number;
  slides: CarouselSlideProps[];
  duration: number;
  pause: number;
  autoPlay: boolean;
};
export type UseCarouselReturn = CarouselState & {
  carousel: CarouselSlideProps[];
  margin: number;
  transform: number;
  setNext: Dispatch<SetStateAction<number>>;
  setPlay: Dispatch<SetStateAction<boolean>>;
};
export type UseCarousel = (props: UseCarouselProps) => UseCarouselReturn;
const useCarousel: UseCarousel = ({
  show,
  slides,
  duration,
  pause,
  autoPlay,
}) => {
  const initialState = useMemo(
    () => getState({show, slides, curr: 0, next: 0}),
    [show, slides]
  );

  const [play, setPlay] = useState(autoPlay);
  const [state, dispatchState] = useReducer(
    (oldState: CarouselState, action: Partial<GetStateProps>) =>
      getState({...oldState, show, slides, ...action}),
    initialState
  );

  const {curr, next} = state;
  const isSliding = curr !== next;

  useEffect(() => slideEffect({curr, next, duration, dispatchState}), [
    curr,
    next,
    duration,
  ]);

  const setNext = useCallback(index => dispatchState({next: index}), [
    dispatchState,
  ]);

  useEffect(
    () =>
      playEffect({
        play,
        autoPlay,
        isSliding,
        show,
        curr,
        slides,
        pause,
        dispatchState,
      }),
    [play, autoPlay, isSliding, show, curr, slides, pause]
  );

  const isForwards = getIsForwards({curr, next, slides});
  const carousel = getCarousel({show, slides, curr, next});

  return {
    ...state,
    carousel,
    margin: getMargin({show, isForwards, carousel}),
    transform: getTransform({show, isForwards, carousel}),
    setNext,
    setPlay,
  };
};
export default useCarousel;
