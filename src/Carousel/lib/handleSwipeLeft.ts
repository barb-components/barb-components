import {getThreshold} from './helpers';
import {HandleSwipeProps} from './types';

const handleSwipeLeft: HandleSwipeProps = ({
  eventData,
  offset,
  dispatchAction,
  dispatchState,
}) => {
  const {
    event: {target},
  } = eventData;
  const threshold = target ? getThreshold(target) : null;
  const isSwipe = threshold && offset > threshold;

  isSwipe ? dispatchAction({type: 'next'}) : dispatchState({bounce: true});
};

export default handleSwipeLeft;
