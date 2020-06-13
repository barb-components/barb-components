import {
  ButtonHTMLAttributes,
  Dispatch,
  FC,
  HTMLAttributes,
  ReactNode,
} from 'react';
import {EventData} from 'react-swipeable';
export type CarouselSlideProps = {
  uuid: string;
  slide: ReactNode;
};
export type CarouselView = 'one' | 'two' | 'three';
export type CarouselProps = {
  slides: CarouselSlideProps[];
  autoPlay?: boolean;
  showNav?: boolean;
  prevButton?: FC<ButtonHTMLAttributes<HTMLButtonElement>>;
  nextButton?: FC<ButtonHTMLAttributes<HTMLButtonElement>>;
  view?: CarouselView;
  carouselClassName?: string;
  trackClassName?: string;
  slideClassName?: string;
  navClassName?: string;
  activeClassName?: string;
};
export type SlideProps = HTMLAttributes<HTMLElement> & {
  view?: 'one' | 'two' | 'three';
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
  type: 'prev' | 'next' | 'jump' | 'play';
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
  prevButton?: FC<ButtonHTMLAttributes<HTMLButtonElement>>;
  nextButton?: FC<ButtonHTMLAttributes<HTMLButtonElement>>;
};
export type HandleSwipeProps = (props: {
  eventData: EventData;
  offset: number;
  dispatchAction: Dispatch<CarouselAction>;
  dispatchState: Dispatch<Partial<CarouselState>>;
}) => void;
