import React, {FC, useCallback} from 'react';

import styles from './carousel.module.scss';
import {CarouselProps} from './carousel.types';
import CarouselNav from './CarouselNav.component';
import Slide from './Slide.component';
import useCarousel from './useCarousel';

const Carousel: FC<CarouselProps> = ({
  slides: _slides,
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
  const {
    slides,
    dispatch,
    offset,
    bounce,
    slidingClass,
    swipeHandlers,
    current,
  } = useCarousel(_slides, autoPlay);

  const handleNavClick = useCallback(action => dispatch(action), [dispatch]);
  const setPlay = useCallback(play => dispatch({action: 'play', play}), [
    dispatch,
  ]);

  const draggingClass = offset ? styles.dragging : '';
  const bouncingClass = bounce ? styles.bouncing : '';
  const trackStyle = offset ? {transform: `translateX(${-offset}px)`} : {};

  return (
    <section
      className={`${styles.carousel} ${carouselClassName}`}
      onMouseEnter={() => setPlay(false)}
      onMouseLeave={() => setPlay(true)}
    >
      <section
        className={`${styles.track} ${slidingClass} ${draggingClass} ${bouncingClass} ${trackClassName}`}
        style={trackStyle}
        {...swipeHandlers}
      >
        {slides.map(({uuid, slide}) => (
          <Slide key={uuid} className={slideClassName}>
            {slide}
          </Slide>
        ))}
      </section>
      {showNav && (
        <CarouselNav
          slides={_slides}
          current={current}
          prevButton={prevButton}
          nextButton={nextButton}
          handleNavClick={handleNavClick}
          className={navClassName}
          activeClassName={activeClassName}
        />
      )}
    </section>
  );
};
export default Carousel;
