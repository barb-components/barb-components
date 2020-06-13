import faker from 'faker/locale/en_GB';
import React, {FC} from 'react';
import {useValue} from 'react-cosmos/fixture';

import {ReactComponent as PrevIcon} from '../assets/chevron-left.svg';
import {ReactComponent as NextIcon} from '../assets/chevron-right.svg';
import {Carousel, SlideContent, SlideImage} from '../Carousel';
import {CarouselProps, CarouselSlideProps, CarouselView} from '../Carousel/lib';
import AppFixture from './AppFixture';
import styles from './carousel-fixture.module.scss';

const blankDefaultValue: CarouselProps = {
  slides: generateBlankSlides(),
  slideClassName: styles.blankCarouselSlide,
};
const BlankCarousel: FC = () => {
  const [props] = useValue('Carousel Props', {defaultValue: blankDefaultValue});

  return (
    <AppFixture>
      <Carousel {...props} />
    </AppFixture>
  );
};

const imageDefaultValue: CarouselProps = {
  slides: generateImageSlides(),
  slideClassName: styles.imageCarouselSlide,
};
const ImageCarousel: FC = () => {
  const [props] = useValue('Carousel Props', {
    defaultValue: imageDefaultValue,
  });

  return (
    <AppFixture>
      <Carousel {...props} />
    </AppFixture>
  );
};

const contentDefaultValue: CarouselProps = {
  slides: generateContentSlides(),
  slideClassName: styles.contentSlide,
};
const ContentCarousel: FC = () => {
  const [props] = useValue('Carousel Props', {
    defaultValue: contentDefaultValue,
  });

  return (
    <AppFixture>
      <Carousel
        {...props}
        navClassName={styles.nav}
        activeClassName={styles.active}
      />
    </AppFixture>
  );
};
const ViewTwoCarousel: FC = () => {
  const [props] = useValue('Carousel Props', {
    defaultValue: {...contentDefaultValue, view: 'two' as CarouselView},
  });

  return (
    <AppFixture>
      <Carousel
        {...props}
        navClassName={styles.nav}
        activeClassName={styles.active}
      />
    </AppFixture>
  );
};
const ViewThreeCarousel: FC = () => {
  const [props] = useValue('Carousel Props', {
    defaultValue: {...contentDefaultValue, view: 'three' as CarouselView},
  });

  return (
    <AppFixture>
      <Carousel
        {...props}
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
        navClassName={styles.nav}
        activeClassName={styles.active}
        showNav={false}
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
        navClassName={styles.nav}
        activeClassName={styles.active}
        autoPlay={false}
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
        navClassName={styles.customArrowsNav}
        activeClassName={styles.active}
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
      />
    </AppFixture>
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
  return [...Array(numberOfSlides)].map<CarouselSlideProps>((v, k) =>
    generateImageSlide(k)
  );
}
function generateContentSlides() {
  const numberOfSlides = faker.random.number({min: 2, max: 10});
  return [...Array(numberOfSlides)].map<CarouselSlideProps>((v, k) =>
    generateContentSlide(k)
  );
}

function generateImageSlide(k: number): CarouselSlideProps {
  const props = {
    src: `https://picsum.photos/id/${k + 1}/1024/640`,
    alt: faker.company.catchPhrase(),
  };

  return {
    uuid: faker.random.uuid(),
    slide: <SlideImage className={styles.slideContent} {...props} />,
  };
}
function generateContentSlide(k: number): CarouselSlideProps {
  const props = {
    image: `https://picsum.photos/id/${k + 1}/1024/640`,
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
  'Carousel Custom Arrows': CustomArrowCarousel,
  'Carousel View Two': ViewTwoCarousel,
  'Carousel View Three': ViewThreeCarousel,
};
