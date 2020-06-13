import React, {FC, useCallback} from 'react';

import {CarouselNav, Slide} from './index';
import {CarouselProps, useCarousel} from './lib';
import styles from './styles/carousel.module.scss';

const Carousel: FC<CarouselProps> = ({
  slides: _slides,
  autoPlay = true,
  showNav = true,
  prevButton,
  nextButton,
  view = 'one',
  carouselClassName = '',
  trackClassName = '',
  slideClassName = '',
  navClassName = '',
  activeClassName = '',
}) => {
  const {
    slides,
    dispatchAction,
    offset,
    bounce,
    slidingClass,
    swipeHandlers,
    current,
  } = useCarousel(_slides, autoPlay);

  const handleNavClick = useCallback(action => dispatchAction(action), [
    dispatchAction,
  ]);
  const setPlay = useCallback(play => dispatchAction({type: 'play', play}), [
    dispatchAction,
  ]);

  const draggingClass = offset ? styles.dragging : '';
  const bouncingClass = bounce ? styles.bouncing : '';
  const trackStyle = offset ? {transform: `translateX(${-offset}px)`} : {};
  const viewClass = styles[`view${view}`];

  return (
    <section
      className={`${styles.carousel} ${carouselClassName}`}
      onMouseEnter={() => setPlay(false)}
      onMouseLeave={() => setPlay(true)}
    >
      <section
        className={`${styles.track} ${viewClass} ${slidingClass} ${draggingClass} ${bouncingClass} ${trackClassName}`}
        style={trackStyle}
        {...swipeHandlers}
      >
        {slides.map(({uuid, slide}) => (
          <Slide key={uuid} view={view} className={slideClassName}>
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
