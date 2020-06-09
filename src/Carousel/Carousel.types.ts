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
