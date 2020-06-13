import React, {FC} from 'react';

import {CarouselNavProps} from './lib';
import styles from './styles/carousel-nav.module.scss';

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
        onClick={() => handleNavClick({type: 'prev'})}
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
            onClick={() => handleNavClick({type: 'jump', next: index})}
          />
        ))}
      </ul>
      <NextButton
        title="Next slide."
        type="button"
        onClick={() => handleNavClick({type: 'next'})}
      >
        Next
      </NextButton>
    </nav>
  );
};
export default CarouselNav;
