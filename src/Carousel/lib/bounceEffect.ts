import {Dispatch} from 'react';

import {CarouselState} from './types';

export type BounceEffect = (props: {
  bounce: boolean;
  dispatchState: Dispatch<Partial<CarouselState>>;
}) => void;

const bounceEffect: BounceEffect = ({bounce, dispatchState}) => {
  if (!bounce) {
    return;
  }

  dispatchState({offset: 0});
  const id = setTimeout(() => dispatchState({bounce: false}), 250);

  return () => {
    dispatchState({offset: 0, bounce: false});
    clearTimeout(id);
  };
};

export default bounceEffect;
