import React, {FC, ImgHTMLAttributes} from 'react';

import {SlideImageProps} from './lib';
import styles from './styles/image.module.scss';

const SlideImage: FC<SlideImageProps & ImgHTMLAttributes<HTMLImageElement>> = ({
  className = '',
  alt = '',
  ...props
}) => <img {...props} alt={alt} className={`${styles.image} ${className}`} />;

export default SlideImage;
