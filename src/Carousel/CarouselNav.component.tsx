import React, {FC} from 'react';

import {CarouselNavProps} from './lib';
import styles from './styles/nav.module.scss';

const CarouselNav: FC<CarouselNavProps> = ({
  slides,
  curr,
  handleClick,
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
        onClick={() => handleClick(curr - 1)}
      >
        Prev
      </PrevButton>
      <ul>
        {slides.map(({id}, index) => (
          <li
            key={id}
            title={`Slide #${index + 1}.`}
            className={
              index === curr ? `${styles.active} ${activeClassName}` : ''
            }
            onClick={() => handleClick(index)}
          />
        ))}
      </ul>
      <NextButton
        title="Next slide."
        type="button"
        onClick={() => handleClick(curr + 1)}
      >
        Next
      </NextButton>
    </nav>
  );
};
export default CarouselNav;
