import React, {FC, useCallback} from 'react';

import {CarouselNav, Slide} from './index';
import {CarouselProps, getIndex, useCarousel} from './lib';
import styles from './styles/carousel.module.scss';

const Carousel: FC<CarouselProps> = ({
  show = 2,
  duration = 500,
  pause = 5000,
  ratio = 0.625,
  slides = [],
  autoPlay = true,
  showNav = true,
  prevButton,
  nextButton,
  carouselClassName = '',
  trackClassName = '',
  slideClassName = '',
  navClassName = '',
  activeClassName = '',
}) => {
  const slidesLength = slides.length;
  const isCarousel = slidesLength > show;

  const {
    carousel,
    margin,
    transform,
    curr,
    next,
    setNext,
    setPlay,
  } = useCarousel({
    show,
    duration,
    pause,
    slides,
    autoPlay: isCarousel && autoPlay,
  });

  const isSliding = curr !== next;
  const handleNavClick = useCallback(
    index => {
      if (isSliding) {
        return;
      }
      const nextIndex = getIndex({show, index, slides});
      setNext(nextIndex);
    },
    [isSliding, show, slides, setNext]
  );

  if (!slidesLength || show < 1 || !carousel) {
    return null;
  }

  const trackStyle = {
    width: `calc(${carousel.length * 100}% / ${show})`,
    marginLeft: isCarousel ? `calc(${margin * 100}% / ${show})` : 0,
    transform: isCarousel
      ? `translateX(calc(${transform * 100}% / ${carousel.length}))`
      : 'none',
    transitionDuration: `${curr !== next ? duration : 0}ms`,
  };
  const slideStyle = {
    width: `calc(100% / ${carousel.length})`,
    paddingBottom: `calc(100% / ${carousel.length} * ${ratio})`,
  };

  return (
    <section
      className={`carousel ${styles.carousel} ${carouselClassName}`}
      onMouseEnter={() => autoPlay && setPlay(false)}
      onMouseLeave={() => autoPlay && setPlay(true)}
    >
      <div
        style={trackStyle}
        className={`track ${styles.track} ${trackClassName}`}
      >
        {carousel.map(({id, slide}) => (
          <Slide
            key={id}
            style={slideStyle}
            className={slideClassName}
            slide={slide}
          />
        ))}
      </div>
      {showNav && isCarousel && (
        <CarouselNav
          slides={slides}
          curr={curr}
          prevButton={prevButton}
          nextButton={nextButton}
          handleClick={handleNavClick}
          className={navClassName}
          activeClassName={activeClassName}
        />
      )}
    </section>
  );
};
export default Carousel;
