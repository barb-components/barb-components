import {Dispatch} from 'react';

import {CarouselAction} from './types';

export type PlayEffectProps = (props: {
  autoPlay: boolean;
  play: boolean;
  dispatchAction: Dispatch<CarouselAction>;
}) => void;

const playEffect: PlayEffectProps = ({autoPlay, play, dispatchAction}) => {
  if (!autoPlay || !play) {
    return;
  }

  const id = setTimeout(() => dispatchAction({type: 'next'}), 3000);
  return () => clearTimeout(id);
};

export default playEffect;
