import faker from 'faker/locale/en_GB';
import React, {FC} from 'react';
import {useValue} from 'react-cosmos/fixture';

import {SlideContent, SlideImage} from './Carousel';
import styles from './carousel-fixture.module.scss';
import Carousel from './Carousel/Carousel.component';
import {CarouselProps} from './Carousel/carousel.types';

const blankDefaultValue: CarouselProps = {
  slides: generateBlankSlides(),
  slideClassName: styles.blankCarouselSlide,
};
const BlankCarousel: FC = () => {
  const [props] = useValue('Carousel Props', {defaultValue: blankDefaultValue});

  return <Carousel {...props} />;
};

const imageDefaultValue: CarouselProps = {
  slides: generateImageSlides(),
  slideClassName: styles.imageCarouselSlide,
};
const ImageCarousel: FC = () => {
  const [props] = useValue('Carousel Props', {
    defaultValue: imageDefaultValue,
  });

  return <Carousel {...props} />;
};

const contentDefaultValue = {
  slides: generateContentSlides(),
  slideClassName: styles.contentSlide,
};
const ContentCarousel: FC = () => {
  const [props] = useValue('Carousel Props', {
    defaultValue: contentDefaultValue,
  });

  return (
    <Carousel
      {...props}
      navClassName={styles.nav}
      activeClassName={styles.active}
    />
  );
};
const NoNavCarousel: FC = () => {
  const [props] = useValue('Carousel Props', {
    defaultValue: contentDefaultValue,
  });

  return (
    <Carousel
      {...props}
      navClassName={styles.nav}
      activeClassName={styles.active}
      showNav={false}
    />
  );
};
const NoAutoPlayCarousel: FC = () => {
  const [props] = useValue('Carousel Props', {
    defaultValue: contentDefaultValue,
  });

  return (
    <Carousel
      {...props}
      navClassName={styles.nav}
      activeClassName={styles.active}
      autoPlay={false}
    />
  );
};

function generateBlankSlides() {
  const numberOfSlides = faker.random.number({min: 2, max: 10});
  return [...Array(numberOfSlides)].map((_, index) => ({
    uuid: faker.random.uuid(),
    slide: <span>{index + 1}</span>,
  }));
}
function generateImageSlides() {
  const numberOfSlides = faker.random.number({min: 2, max: 10});
  return [...Array(numberOfSlides)].map(generateImageSlide);
}
function generateContentSlides() {
  const numberOfSlides = faker.random.number({min: 2, max: 10});
  return [...Array(numberOfSlides)].map(generateContentSlide);
}

function generateImageSlide() {
  const props = {
    src: `http://placeimg.com/1024/640/any?cachebuster=${faker.random.number()}`,
    alt: faker.company.catchPhrase(),
  };

  return {
    uuid: faker.random.uuid(),
    slide: <SlideImage className={styles.slideContent} {...props} />,
  };
}
function generateContentSlide() {
  const props = {
    image: `http://placeimg.com/1024/640/any?cachebuster=${faker.random.number()}`,
    title: faker.company.catchPhrase(),
    text: faker.lorem.paragraph(),
    contentClassName: styles.content,
    imageClassName: styles.image,
  };

  return {
    uuid: faker.random.uuid(),
    slide: <SlideContent {...props} />,
  };
}
export default {
  'Blank Carousel': BlankCarousel,
  'Image Carousel': ImageCarousel,
  'Content Carousel': ContentCarousel,
  'Carousel No Nav': NoNavCarousel,
  'Carousel No AutoPlay': NoAutoPlayCarousel,
};
