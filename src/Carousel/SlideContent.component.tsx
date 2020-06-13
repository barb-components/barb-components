import React, {FC} from 'react';

import {SlideImage} from './index';
import {preventOrphans, SlideContentProps, truncateString} from './lib';
import styles from './styles/slide-content.module.scss';

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
      <p>{preventOrphans(truncateString(text, 100))}</p>
    </section>
    <SlideImage
      src={image}
      className={`${styles.image} ${imageClassName}`}
      alt={title}
    />
  </>
);
export default SlideContent;
