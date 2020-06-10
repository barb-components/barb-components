import React, {FC} from 'react';

import styles from './carousel-nav.module.scss';
import {CarouselNavProps} from './carousel.types';

const CarouselNav: FC<CarouselNavProps> = ({
  slides,
  current,
  handleNavClick,
  className = '',
  activeClassName = '',
  prevButton,
  nextButton,
}) => {
  const PrevButton = prevButton || (props => <button {...props} />);
  const NextButton = nextButton || (props => <button {...props} />);

  return (
    <nav className={`${className} ${styles.nav}`}>
      <PrevButton
        title="Previous slide."
        type="button"
        onClick={() => handleNavClick({action: 'prev'})}
      >
        Prev
      </PrevButton>
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
      <NextButton
        title="Next slide."
        type="button"
        onClick={() => handleNavClick({action: 'next'})}
      >
        Next
      </NextButton>
    </nav>
  );
};
export default CarouselNav;
