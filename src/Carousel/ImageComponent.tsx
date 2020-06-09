import React, {FC, ImgHTMLAttributes} from 'react';

import {ImageProps} from './Carousel.types';
import styles from './image.module.scss';

const Image: FC<ImageProps & ImgHTMLAttributes<HTMLImageElement>> = ({
  ratio = '62.5%',
  className = '',
  imageClassName = '',
  alt = '',
  ...props
}) => (
  <div
    className={`${styles.imageWrapper} ${className}`}
    style={{paddingBottom: ratio}}
  >
    <img {...props} alt={alt} className={imageClassName} />
  </div>
);

export default Image;
