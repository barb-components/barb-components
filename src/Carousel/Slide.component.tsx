import React, {FC, HTMLAttributes} from 'react';

import styles from './slide.module.scss';

const Slide: FC<HTMLAttributes<HTMLElement>> = ({className = '', children}) => (
  <section className={`${styles.slide} ${className}`}>{children}</section>
);
export default Slide;
