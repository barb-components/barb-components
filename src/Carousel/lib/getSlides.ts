import {CarouselSlideProps} from './types';

export type GetSlides = (props: {
  index: number;
  slides: CarouselSlideProps[];
}) => CarouselSlideProps[];

const getSlides: GetSlides = ({index, slides}) => {
  const length = slides.length;
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

  return newSlides.map(({uuid, slide}, index) => ({
    uuid: length > 4 ? uuid : `${index}-${uuid}`,
    slide,
  }));
};

export default getSlides;
