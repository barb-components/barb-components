import {CarouselSlideProps} from './types';

export type GetSlides = (props: {
  index: number;
  length: number;
  slides: CarouselSlideProps[];
}) => CarouselSlideProps[];

const getSlides: GetSlides = ({index, length, slides}) => {
  const firstSlide = (length + index - 2) % length;
  const prevSlide = (length + index - 1) % length;
  const currSlide = index;
  const nextSlide = (index + 1) % length;
  const lastSlide = (index + 2) % length;

  const newSlides = [
    slides[firstSlide],
    slides[prevSlide],
    slides[currSlide],
    slides[nextSlide],
    slides[lastSlide],
  ];

  return newSlides.map((slide, index) => ({
    ...slide,
    uuid: length > 4 ? slide.uuid : `${index}-${slide.uuid}`,
  }));
};

export default getSlides;
