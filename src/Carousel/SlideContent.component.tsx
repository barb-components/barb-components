import React, {FC} from 'react';

import {preventOrphans, truncateString} from '../lib';
import {SlideImage} from './index';
import {SlideContentProps} from './lib';
import styles from './styles/content.module.scss';

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
