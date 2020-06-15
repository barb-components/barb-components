import {ButtonHTMLAttributes, FC, HTMLAttributes, ReactNode} from 'react';

export type CarouselSlideProps = {
  id: string;
  slide: ReactNode;
};
export type CarouselProps = {
  slides: CarouselSlideProps[];
  duration?: number;
  pause?: number;
  ratio?: number;
  autoPlay?: boolean;
  showNav?: boolean;
  prevButton?: FC<ButtonHTMLAttributes<HTMLButtonElement>>;
  nextButton?: FC<ButtonHTMLAttributes<HTMLButtonElement>>;
  show?: number;
  carouselClassName?: string;
  trackClassName?: string;
  slideClassName?: string;
  navClassName?: string;
  activeClassName?: string;
};
export type SlideProps = HTMLAttributes<HTMLElement> & {
  slide: ReactNode;
};
export type CarouselNavProps = {
  slides: CarouselSlideProps[];
  curr: number;
  handleClick: (index: number) => void;
  className?: string;
  activeClassName: string;
  prevButton?: FC<ButtonHTMLAttributes<HTMLButtonElement>>;
  nextButton?: FC<ButtonHTMLAttributes<HTMLButtonElement>>;
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
export type CarouselState = {
  curr: number;
  next: number;
};
