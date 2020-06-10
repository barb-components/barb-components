import {ReactNode} from 'react';
export type CarouselSlideProps = {
  uuid: string;
  slide: ReactNode;
};
export type CarouselProps = {
  slides: CarouselSlideProps[];
  autoPlay?: boolean;
  showNav?: boolean;
  carouselClassName?: string;
  trackClassName?: string;
  slideClassName?: string;
  navClassName?: string;
  activeClassName?: string;
};
export type SlideProps = {
  image: string;
  title: string;
  text?: string;
};
export type CarouselState = {
  current: number;
  offset: number;
  bounce: boolean;
  slides: CarouselSlideProps[];
  slidingClass: string;
  play: boolean;
};
export type CarouselAction = {
  action: 'prev' | 'next' | 'jump' | 'play';
  next?: number;
  play?: boolean;
};
export type SlideContentProps = {
  title: string;
  text?: string;
  image: string;
  contentClassName?: string;
  imageClassName?: string;
};
export type SlideImageProps = {
  alt: string;
  ratio?: string;
  className?: string;
};
export type CarouselNavProps = {
  slides: CarouselSlideProps[];
  current: number;
  handleNavClick: (action: CarouselAction) => void;
  className?: string;
  activeClassName: string;
};
