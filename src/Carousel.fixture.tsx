import faker from 'faker/locale/en_GB';
import React, {FC} from 'react';
import {useValue} from 'react-cosmos/fixture';

import Carousel from './Carousel/CarouselComponent';

const defaultValue = {
  slides: generateSlides(),
};

const CarouselFixture: FC = () => {
  const [props] = useValue('Carousel Props', {defaultValue});

  return <Carousel {...props} />;
};

function generateSlides() {
  const numberOfSlides = faker.random.number({min: 2, max: 10});
  return [...Array(numberOfSlides)].map(generateSlide);
}

function generateSlide() {
  return {
    uuid: faker.random.uuid(),
    image: `http://placeimg.com/1024/640/any?cachebuster=${faker.random.number()}`,
    title: faker.company.catchPhrase(),
    text: faker.lorem.paragraph(),
  };
}
export default CarouselFixture;
