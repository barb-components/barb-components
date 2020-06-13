import {getThreshold} from './helpers';
import {HandleSwipeProps} from './types';

const handleSwipeRight: HandleSwipeProps = ({
  eventData,
  offset,
  dispatchAction,
  dispatchState,
}): void => {
  const {
    event: {target},
  } = eventData;
  const threshold = target ? getThreshold(target) : null;
  const isSwipe = threshold && -offset > threshold;

  isSwipe ? dispatchAction({type: 'prev'}) : dispatchState({bounce: true});
};

export default handleSwipeRight;
