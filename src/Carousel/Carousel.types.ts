export type CarouselSlideProps = SlideProps & {uuid: string};
export type CarouselProps = {
  slides: CarouselSlideProps[];
};
export type SlideProps = {
  image: string;
  title: string;
  text?: string;
};
export type ImageProps = {
  alt: string;
  ratio?: string;
  className?: string;
  imageClassName?: string;
};
export type CarouselState = {
  current: number;
  offset: number;
  bounce: boolean;
  slides: CarouselSlideProps[];
  slidingClass: string;
  autoPlay: boolean;
};
export type CarouselAction = {
  action: 'prev' | 'next' | 'jump' | 'autoPlay';
  next?: number;
  autoPlay?: boolean;
};
