import React, {FC} from 'react';

import {SlideProps} from './Carousel.types';
import Image from './ImageComponent';
import styles from './slide.module.scss';

const Slide: FC<SlideProps> = ({title, text, image}) => (
  <section className={styles.slide}>
    <section>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
    <Image src={image} className={styles.image} alt={title} />
  </section>
);
export default Slide;
