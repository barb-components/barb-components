import faker from 'faker/locale/en_GB';
import React, {FC} from 'react';
import {useValue} from 'react-cosmos/fixture';

import {ReactComponent as PrevIcon} from '../assets/chevron-left.svg';
import {ReactComponent as NextIcon} from '../assets/chevron-right.svg';
import {SlideContent, SlideImage} from '../Carousel';
import Carousel from '../Carousel/Carousel.component';
import {CarouselProps} from '../Carousel/lib';
import AppFixture from './AppFixture';
import styles from './carousel.module.scss';

const getNumberOfSlides = () => faker.random.number({min: 2, max: 10});
const blankDefaultValue: CarouselProps = {
  show: 1,
  ratio: 0.375,
  slides: generateBlankSlides(),
};
const imageDefaultValue: CarouselProps = {
  show: 1,
  ratio: 0.375,
  slides: generateImageSlides(),
};
const contentDefaultValue: CarouselProps = {
  show: 1,
  ratio: 0.375,
  slides: generateContentSlides(),
};
const BlankCarousel: FC = () => {
  const [props] = useValue('Carousel Props', {defaultValue: blankDefaultValue});

  return (
    <AppFixture>
      <Carousel
        {...props}
        carouselClassName={styles.carousel}
        trackClassName={styles.track}
        slideClassName={`${styles.slide} ${styles.blankSlide}`}
        navClassName={styles.nav}
        activeClassName={styles.active}
      />
    </AppFixture>
  );
};
const ImageCarousel: FC = () => {
  const [props] = useValue('Carousel Props', {defaultValue: imageDefaultValue});

  return (
    <AppFixture>
      <Carousel
        {...props}
        carouselClassName={styles.carousel}
        trackClassName={styles.track}
        slideClassName={`${styles.slide}`}
        navClassName={styles.nav}
        activeClassName={styles.active}
      />
    </AppFixture>
  );
};
const ContentCarousel: FC = () => {
  const [props] = useValue('Carousel Props', {
    defaultValue: contentDefaultValue,
  });

  return (
    <AppFixture>
      <Carousel
        {...props}
        carouselClassName={styles.carousel}
        trackClassName={styles.track}
        slideClassName={`${styles.slide} ${styles.contentSlide}`}
        navClassName={styles.nav}
        activeClassName={styles.active}
      />
    </AppFixture>
  );
};
const NoNavCarousel: FC = () => {
  const [props] = useValue('Carousel Props', {
    defaultValue: contentDefaultValue,
  });

  return (
    <AppFixture>
      <Carousel
        {...props}
        showNav={false}
        carouselClassName={styles.carousel}
        trackClassName={styles.track}
        slideClassName={`${styles.slide} ${styles.contentSlide}`}
        navClassName={styles.nav}
        activeClassName={styles.active}
      />
    </AppFixture>
  );
};
const NoAutoPlayCarousel: FC = () => {
  const [props] = useValue('Carousel Props', {
    defaultValue: contentDefaultValue,
  });

  return (
    <AppFixture>
      <Carousel
        {...props}
        autoPlay={false}
        carouselClassName={styles.carousel}
        trackClassName={styles.track}
        slideClassName={`${styles.slide} ${styles.contentSlide}`}
        navClassName={styles.nav}
        activeClassName={styles.active}
      />
    </AppFixture>
  );
};
const CustomArrowCarousel: FC = () => {
  const [props] = useValue('Carousel Props', {
    defaultValue: contentDefaultValue,
  });

  return (
    <AppFixture>
      <Carousel
        {...props}
        prevButton={props => (
          <button {...props} className={styles.buttons}>
            <PrevIcon />
          </button>
        )}
        nextButton={props => (
          <button {...props} className={styles.buttons}>
            <NextIcon />
          </button>
        )}
        carouselClassName={styles.carousel}
        trackClassName={styles.track}
        slideClassName={`${styles.slide} ${styles.contentSlide}`}
        navClassName={`${styles.nav} ${styles.customArrowsNav}`}
        activeClassName={styles.active}
      />
    </AppFixture>
  );
};
const ShowTwoCarousel: FC = () => {
  const [props] = useValue('Carousel Props', {
    defaultValue: {...contentDefaultValue, show: 2, ratio: 0.625},
  });

  return (
    <AppFixture>
      <Carousel
        {...props}
        prevButton={props => (
          <button {...props} className={styles.buttons}>
            <PrevIcon />
          </button>
        )}
        nextButton={props => (
          <button {...props} className={styles.buttons}>
            <NextIcon />
          </button>
        )}
        carouselClassName={styles.carousel}
        trackClassName={styles.track}
        slideClassName={`${styles.slide} ${styles.contentSlide}`}
        navClassName={`${styles.nav} ${styles.customArrowsNav}`}
        activeClassName={styles.active}
      />
    </AppFixture>
  );
};
const ShowThreeCarousel: FC = () => {
  const [props] = useValue('Carousel Props', {
    defaultValue: {...contentDefaultValue, show: 3, ratio: 1},
  });

  return (
    <AppFixture>
      <Carousel
        {...props}
        prevButton={props => (
          <button {...props} className={styles.buttons}>
            <PrevIcon />
          </button>
        )}
        nextButton={props => (
          <button {...props} className={styles.buttons}>
            <NextIcon />
          </button>
        )}
        carouselClassName={styles.carousel}
        trackClassName={styles.track}
        slideClassName={`${styles.slide} ${styles.contentSlide}`}
        navClassName={`${styles.nav} ${styles.customArrowsNav}`}
        activeClassName={styles.active}
      />
    </AppFixture>
  );
};

export default {
  'Blank Carousel': BlankCarousel,
  'Image Carousel': ImageCarousel,
  'Content Carousel': ContentCarousel,
  'Carousel No Nav': NoNavCarousel,
  'Carousel No AutoPlay': NoAutoPlayCarousel,
  'Carousel Custom Arrows': CustomArrowCarousel,
  'Carousel Show Two': ShowTwoCarousel,
  'Carousel Show Three': ShowThreeCarousel,
};

function generateBlankSlides() {
  const numberOfSlides = getNumberOfSlides();
  return [...Array(numberOfSlides)].map((_, index) => ({
    id: faker.random.uuid(),
    slide: <span>{index + 1}</span>,
  }));
}
function generateImageSlides() {
  const numberOfSlides = getNumberOfSlides();
  return [...Array(numberOfSlides)].map((_, index) => ({
    id: faker.random.uuid(),
    slide: (
      <SlideImage
        alt={faker.lorem.words()}
        src={`https://loremflickr.com/320/240?lock=${faker.random.number()}`}
      />
    ),
  }));
}
function generateContentSlides() {
  const numberOfSlides = getNumberOfSlides();
  return [...Array(numberOfSlides)].map((_, index) => ({
    id: faker.random.uuid(),
    slide: (
      <SlideContent
        imageClassName={styles.slideImage}
        contentClassName={styles.slideContent}
        title={faker.company.bsBuzz()}
        text={faker.company.bs()}
        image={`https://loremflickr.com/320/240?lock=${faker.random.number()}`}
      />
    ),
  }));
}
