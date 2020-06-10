import React, {FC} from 'react';

import styles from './carousel-nav.module.scss';
import {CarouselNavProps} from './carousel.types';

const CarouselNav: FC<CarouselNavProps> = ({
  slides,
  current,
  handleNavClick,
  className = '',
  activeClassName = '',
}) => {
  return (
    <nav className={`${className} ${styles.nav}`}>
      <button
        title="Previous slide."
        type="button"
        onClick={() => handleNavClick({action: 'prev'})}
      >
        Prev
      </button>
      <ul>
        {slides.map(({uuid}, index) => (
          <li
            key={uuid}
            title={`Slide #${index + 1}.`}
            className={
              index === current ? `${styles.active} ${activeClassName}` : ''
            }
            onClick={() => handleNavClick({action: 'jump', next: index})}
          />
        ))}
      </ul>
      <button
        title="Next slide."
        type="button"
        onClick={() => handleNavClick({action: 'next'})}
      >
        Next
      </button>
    </nav>
  );
};
export default CarouselNav;
