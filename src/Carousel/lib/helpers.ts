import {CarouselSlideProps, CarouselState} from './types';

export type GetCarouselLength = (show: number) => number;
export const getCarouselLength: GetCarouselLength = show => show | 1;

export type GetSlidesBeforeAfter = (show: number) => number;
export const getSlidesBefore: GetSlidesBeforeAfter = show =>
  (getCarouselLength(show) - 1) / 2;
export const getSlidesAfter = getSlidesBefore;

export type GetIndex = (props: {
  show: number;
  index: number;
  slides: CarouselSlideProps[];
}) => number;
export const getIndex: GetIndex = ({show, index, slides}) => {
  const length = slides.length;

  return (length + index) % length;
};
export const getFirstIndex: GetIndex = ({show, index, slides}) => {
  const length = slides.length;
  const slidesBefore = getSlidesBefore(show);

  return (length + index - slidesBefore) % length;
};
export const getLastIndex: GetIndex = ({show, index, slides}) => {
  const length = slides.length;
  const slidesAfter = getSlidesAfter(show);

  return (length + index + slidesAfter) % length;
};

export type GetIsForwards = (props: {
  curr: number;
  next: number;
  slides: CarouselSlideProps[];
}) => boolean | null;
export const getIsForwards: GetIsForwards = ({curr, next, slides}) => {
  if (curr === next) {
    return null;
  }
  const length = slides.length;
  return (
    (length === 2 && curr === 1 && next === 0) ||
    (next > curr && next - curr <= length / 2) ||
    (next < curr && curr - next >= length / 2)
  );
};

export type GetSlides = (props: {
  show: number;
  index: number;
  slides: CarouselSlideProps[];
}) => CarouselSlideProps[];
export const getSlides: GetSlides = ({show, index, slides}) => {
  const carouselLength = getCarouselLength(show);
  const firstIndex = getFirstIndex({show, index, slides});

  return [...Array(carouselLength)].map(
    (v, k) => slides[getIndex({show, index: k + firstIndex, slides})]
  );
};

export type GetCarousel = (props: {
  show: number;
  slides: CarouselSlideProps[];
  curr: number;
  next: number;
}) => CarouselSlideProps[];
export type DeDupeId = (slide: CarouselSlideProps) => CarouselSlideProps;
export const deDupeId: DeDupeId = ({id, slide}) => ({id: `dupe-${id}`, slide});
export const getForwardsSlides: GetCarousel = ({show, slides, curr, next}) => {
  const slidesLength = slides.length;
  const carouselLength = getCarouselLength(show);
  const moveFirstIndex = getLastIndex({show, index: curr + 1, slides});
  const moveLastIndex = getLastIndex({show, index: next, slides});

  const offset =
    (moveLastIndex > moveFirstIndex
      ? moveLastIndex - moveFirstIndex
      : slidesLength + moveLastIndex - moveFirstIndex) % slidesLength;
  const moveLength = Math.min(1 + offset, carouselLength);

  const move = [...Array(moveLength)].map(
    (v, k) =>
      slides[
        getIndex({show, index: k + moveLastIndex - moveLength + 1, slides})
      ]
  );

  carouselLength + moveLength > slidesLength &&
    (move[moveLength - 1] = deDupeId(move[moveLength - 1]));

  return move;
};
export const getBackwardsSlides: GetCarousel = ({show, slides, curr, next}) => {
  const slidesLength = slides.length;
  const carouselLength = getCarouselLength(show);
  const moveFirstIndex = getFirstIndex({show, index: next, slides});
  const moveLastIndex = getFirstIndex({show, index: curr - 1, slides});

  const offset =
    (moveLastIndex > moveFirstIndex
      ? moveLastIndex - moveFirstIndex
      : slidesLength + moveLastIndex - moveFirstIndex) % slidesLength;
  const moveLength = Math.min(1 + offset, carouselLength);

  const move = [...Array(moveLength)].map(
    (v, k) => slides[getIndex({show, index: k + moveFirstIndex, slides})]
  );

  carouselLength + moveLength > slidesLength && (move[0] = deDupeId(move[0]));

  return move;
};
export const getCarousel: GetCarousel = ({show, slides, curr, next}) => {
  if (slides.length <= show) {
    return slides;
  }
  if (next === curr) {
    return getSlides({show, index: curr, slides});
  }
  const forwards = getIsForwards({curr, next, slides});

  return forwards
    ? [
        ...getSlides({show, index: curr, slides}),
        ...getForwardsSlides({show, slides, curr, next}),
      ]
    : [
        ...getBackwardsSlides({show, slides, curr, next}),
        ...getSlides({show, index: curr, slides}),
      ];
};

export type GetMargin = (props: {
  show: number;
  isForwards: boolean | null;
  carousel: CarouselSlideProps[];
}) => number;
export const getMargin: GetMargin = ({show, isForwards, carousel}) => {
  const carouselLength = getCarouselLength(show);
  const moveLength = carousel.length;
  const margin = show === carouselLength ? 0 : (show - carouselLength) / 2;
  if (null === isForwards) {
    return margin;
  }
  const extraSlides = moveLength - carouselLength;
  return isForwards ? margin : margin - extraSlides;
};
export type GetTransform = (props: {
  show: number;
  isForwards: boolean | null;
  carousel: CarouselSlideProps[];
}) => number;
export const getTransform: GetTransform = ({show, isForwards, carousel}) => {
  const carouselLength = getCarouselLength(show);
  const moveLength = carousel.length;
  const extraSlides = moveLength - carouselLength;

  return isForwards ? -extraSlides : extraSlides;
};

export type GetStateProps = {
  show: number;
  slides: CarouselSlideProps[];
  curr: number;
  next: number;
};
export type GetState = (props: GetStateProps) => CarouselState;
export const getState: GetState = ({show, slides, curr, next}) => {
  const isForwards = getIsForwards({curr, next, slides});

  return {
    show,
    slides,
    isForwards,
    curr,
    next,
  };
};
