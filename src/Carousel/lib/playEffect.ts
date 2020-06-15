import {Dispatch} from 'react';

import {getIndex, GetStateProps} from './helpers';
import {CarouselSlideProps} from './types';

export type PlayEffect = (props: {
  play: boolean;
  autoPlay: boolean;
  isSliding: boolean;
  show: number;
  curr: number;
  slides: CarouselSlideProps[];
  pause: number;
  dispatchState: Dispatch<Partial<GetStateProps>>;
}) => void;
const playEffect: PlayEffect = ({
  play,
  autoPlay,
  isSliding,
  show,
  curr,
  slides,
  pause,
  dispatchState,
}) => {
  if (!play || !autoPlay || isSliding || slides.length <= show) {
    return;
  }

  const timer = setTimeout(
    () => dispatchState({next: getIndex({show, index: curr + 1, slides})}),
    pause
  );
  return () => clearTimeout(timer);
};

export default playEffect;
