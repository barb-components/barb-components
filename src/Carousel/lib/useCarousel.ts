import {
  Dispatch,
  Reducer,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import {SwipeableHandlers, useSwipeable} from 'react-swipeable';

import {
  bounceEffect,
  getSlides,
  handleSwipeLeft,
  handleSwipeRight,
  navigationEffect,
  nextSlideReducer,
  playEffect,
  stateReducer,
} from './index';
import {CarouselAction, CarouselSlideProps, CarouselState} from './types';

export type UseCarousel = (
  allSlides: CarouselSlideProps[],
  autoPlay: boolean
) => {
  current: number;
  offset: number;
  slides: CarouselSlideProps[];
  dispatchAction: Dispatch<CarouselAction>;
  dispatchState: Dispatch<Partial<CarouselState>>;
  bounce: boolean;
  slidingClass: string;
  swipeHandlers: SwipeableHandlers;
};

const useCarousel: UseCarousel = (allSlides, autoPlay) => {
  const length = useMemo(() => allSlides.length, [allSlides]);

  // Make Slides
  const makeSlides = useCallback(
    index => getSlides({index, length, slides: allSlides}),
    [allSlides, length]
  );

  // Set State
  const initialState = useMemo(
    () => ({
      current: 0,
      offset: 0,
      bounce: false,
      slides: makeSlides(0),
      slidingClass: '',
      play: true,
    }),
    [makeSlides]
  );
  const [state, dispatchState] = useReducer<
    Reducer<CarouselState, Partial<CarouselState>>
  >(stateReducer, initialState);
  const {
    current,
    offset,
    slides: carouselSlides,
    bounce,
    slidingClass,
    play,
  } = state;

  // Calculate Next Slide
  const [next, dispatchAction] = useReducer<Reducer<number, CarouselAction>>(
    (last, action) =>
      nextSlideReducer({
        lastIndex: last,
        currentIndex: current,
        length,
        action,
        allSlides,
        carouselSlides,
        dispatchState,
      }),
    current
  );

  // Navigation Effect
  useEffect(
    () => navigationEffect({current, next, dispatchState, length, makeSlides}),
    [length, current, next, makeSlides]
  );

  // Swipe Release Bounce Effect
  useEffect(() => bounceEffect({bounce, dispatchState}), [bounce]);

  // Auto Play Effect
  useEffect(() => playEffect({autoPlay, play, dispatchAction}), [
    current,
    autoPlay,
    play,
  ]);

  const onSwiping = useCallback(({deltaX}) => dispatchState({offset: deltaX}), [
    dispatchState,
  ]);
  const onSwipedLeft = useCallback(
    eventData =>
      handleSwipeLeft({eventData, offset, dispatchAction, dispatchState}),
    [offset]
  );
  const onSwipedRight = useCallback(
    eventData =>
      handleSwipeRight({eventData, offset, dispatchAction, dispatchState}),
    [offset]
  );

  // Swipe Handler
  const swipeHandlers = useSwipeable({
    onSwiping,
    onSwipedLeft,
    onSwipedRight,
    trackMouse: true,
    trackTouch: true,
  });

  return {
    current,
    offset,
    slides: carouselSlides,
    dispatchAction,
    dispatchState,
    bounce,
    slidingClass,
    swipeHandlers,
  };
};
export default useCarousel;
