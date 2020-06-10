import {
  Dispatch,
  Reducer,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import {SwipeableHandlers, useSwipeable} from 'react-swipeable';

import styles from './carousel.module.scss';
import {
  CarouselAction,
  CarouselSlideProps,
  CarouselState,
} from './carousel.types';
import {getThreshold, isForwards, stateReducer} from './helpers';

const useCarousel = (
  _slides: CarouselSlideProps[],
  autoPlay: boolean
): {
  current: number;
  offset: number;
  slides: CarouselSlideProps[];
  dispatch: Dispatch<CarouselAction>;
  setState: Dispatch<Partial<CarouselState>>;
  bounce: boolean;
  slidingClass: string;
  swipeHandlers: SwipeableHandlers;
} => {
  const length = useMemo(() => _slides.length, [_slides]);

  // Make Slides
  const makeSlides = useCallback(
    index => {
      const prevSlide = (length + index - 1) % length;
      const currSlide = index;
      const nextSlide = (index + 1) % length;

      const newSlides = [
        _slides[prevSlide],
        _slides[currSlide],
        _slides[nextSlide],
      ];

      return newSlides.map((slide, index) => ({
        ...slide,
        uuid: length > 2 ? slide.uuid : `${index}-${slide.uuid}`,
      }));
    },
    [_slides, length]
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
  const [state, setState] = useReducer<
    Reducer<CarouselState, Partial<CarouselState>>
  >(stateReducer, initialState);
  const {current, offset, slides, bounce, slidingClass, play} = state;

  // Calculate Next Slide
  const nextSlideReducer: Reducer<number, CarouselAction> = (
    last,
    {action, next = 0, play = false}
  ) => {
    const [one, two, three] = slides || [];

    switch (action) {
      case 'prev':
        return (length + current - 1) % length;
      case 'next':
        return (current + 1) % length;
      case 'jump':
        setState({
          slides: isForwards(current, next, length)
            ? [one, two, _slides[next]]
            : [_slides[next], two, three],
        });
        return next;
      case 'play':
        setState({play});
        return last;
    }
  };
  const [next, dispatch] = useReducer<Reducer<number, CarouselAction>>(
    nextSlideReducer,
    current
  );

  // Navigation Effect
  useEffect(() => {
    if (current === next) {
      return;
    }

    setState({
      offset: 0,
      slidingClass: isForwards(current, next, length)
        ? styles.forwards
        : styles.backwards,
    });
    const id = setTimeout(
      () =>
        setState({
          current: next,
          slides: makeSlides(next),
          slidingClass: '',
        }),
      500
    );

    return () => clearTimeout(id);
  }, [length, current, next, makeSlides]);

  // Swipe Release Bounce Effect
  useEffect(() => {
    if (!bounce) {
      return;
    }

    setState({offset: 0});
    const id = setTimeout(() => setState({bounce: false}), 250);

    return () => {
      setState({offset: 0, bounce: false});
      clearTimeout(id);
    };
  }, [bounce, setState]);

  // Auto Play Effect
  useEffect(() => {
    if (!autoPlay || !play) {
      return;
    }

    const id = setTimeout(() => dispatch({action: 'next'}), 2000);
    return () => clearTimeout(id);
  }, [autoPlay, play, current]);

  // Swipe Handler
  const swipeHandlers = useSwipeable({
    onSwiping: ({deltaX}) => setState({offset: deltaX}),
    onSwipedLeft: ({event}) => {
      const {target} = event;
      const threshold = target ? getThreshold(target) : null;
      const isSwipe = threshold && offset > threshold;

      isSwipe ? dispatch({action: 'next'}) : setState({bounce: true});
    },
    onSwipedRight: ({event}) => {
      const {target} = event;
      const threshold = target ? getThreshold(target) : null;
      const isSwipe = threshold && -offset > threshold;

      isSwipe ? dispatch({action: 'prev'}) : setState({bounce: true});
    },
    trackMouse: true,
    trackTouch: true,
  });

  return {
    current,
    offset,
    slides,
    dispatch,
    setState,
    bounce,
    slidingClass,
    swipeHandlers,
  };
};
export default useCarousel;
