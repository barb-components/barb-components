import React, {FC, useCallback} from 'react';

import styles from './carousel.module.scss';
import {CarouselProps} from './Carousel.types';
import Slide from './SlideComponent';
import useCarousel from './use-carousel';

const Carousel: FC<CarouselProps> = ({slides: _slides}) => {
  const {
    slides,
    dispatch,
    offset,
    bounce,
    slidingClass,
    swipeHandlers,
    current,
  } = useCarousel(_slides);

  const handleNavClick = useCallback(action => dispatch(action), [dispatch]);
  const setAutoPlay = useCallback(
    autoPlay => dispatch({action: 'autoPlay', autoPlay}),
    [dispatch]
  );

  const draggingClass = offset ? styles.dragging : '';
  const bouncingClass = bounce ? styles.bouncing : '';
  const trackStyle = offset ? {transform: `translateX(${-offset}px)`} : {};

  return (
    <section
      className={styles.carousel}
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      <section
        className={`${styles.track} ${slidingClass} ${draggingClass} ${bouncingClass}`}
        style={trackStyle}
        {...swipeHandlers}
      >
        {slides.map(({uuid, ...slide}) => (
          <Slide key={uuid} {...slide} />
        ))}
      </section>
      <nav>
        <button type="button" onClick={() => handleNavClick({action: 'prev'})}>
          &laquo; Prev
        </button>
        <ul>
          {_slides.map(({uuid, ...slide}, index) => (
            <li
              key={uuid}
              className={index === current ? styles.active : ''}
              onClick={() => handleNavClick({action: 'jump', next: index})}
            />
          ))}
        </ul>
        <button type="button" onClick={() => handleNavClick({action: 'next'})}>
          Next &raquo;
        </button>
      </nav>
    </section>
  );
};
export default Carousel;
