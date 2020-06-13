import React, {FC} from 'react';

import {SlideProps} from './lib';
import styles from './styles/slide.module.scss';

const Slide: FC<SlideProps> = ({view = 'one', className = '', children}) => {
  const viewClass = styles[`view${view}`];

  return (
    <section className={`${styles.slide} ${viewClass} ${className}`}>
      {children}
    </section>
  );
};
export default Slide;
