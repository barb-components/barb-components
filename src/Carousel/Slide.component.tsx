import React, {FC} from 'react';

import {SlideProps} from './lib';
import styles from './styles/slide.module.scss';

const Slide: FC<SlideProps> = ({style, className = '', slide}) => (
  <section style={style} className={`slide ${styles.slide} ${className}`}>
    {slide}
  </section>
);
export default Slide;
