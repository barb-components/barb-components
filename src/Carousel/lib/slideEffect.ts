import {Dispatch} from 'react';

import {GetStateProps} from './helpers';

export type SlideEffect = (props: {
  curr: number;
  next: number;
  duration: number;
  dispatchState: Dispatch<Partial<GetStateProps>>;
}) => void;
const slideEffect: SlideEffect = ({curr, next, duration, dispatchState}) => {
  if (curr === next) {
    return;
  }
  const timer = setTimeout(() => dispatchState({curr: next}), duration);

  return () => clearTimeout(timer);
};
export default slideEffect;
