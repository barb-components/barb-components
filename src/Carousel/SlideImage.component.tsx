import React, {FC, ImgHTMLAttributes} from 'react';

import {SlideImageProps} from './lib';
import styles from './styles/slide-image.module.scss';

const SlideImage: FC<SlideImageProps & ImgHTMLAttributes<HTMLImageElement>> = ({
  ratio = '62.5%',
  className = '',
  alt = '',
  ...props
}) => <img {...props} alt={alt} className={`${styles.image} ${className}`} />;

export default SlideImage;
