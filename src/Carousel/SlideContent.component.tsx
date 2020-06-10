import React, {FC} from 'react';

import {SlideContentProps} from './carousel.types';
import styles from './slide-content.module.scss';
import Image from './SlideImage.component';

const SlideContent: FC<SlideContentProps> = ({
  title,
  text,
  image,
  imageClassName = '',
  contentClassName = '',
}) => (
  <>
    <section className={`${styles.content} ${contentClassName}`}>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
    <Image
      src={image}
      className={`${styles.image} ${imageClassName}`}
      alt={title}
    />
  </>
);
export default SlideContent;
