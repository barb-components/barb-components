import React, {FC} from 'react';

import {SlideProps} from './lib';
import styles from './styles/slide.module.scss';

const Slide: FC<SlideProps> = ({
  view = 'one',
  jump = false,
  className = '',
  children,
}) => {
  const viewClass = styles[`view${view}`];
  const jumpClass = jump ? styles.jump : '';

  return (
    <section
      className={`${styles.slide} ${viewClass} ${jumpClass} ${className}`}
    >
      {children}
    </section>
  );
};
export default Slide;
