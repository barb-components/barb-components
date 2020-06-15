import * as faker from 'faker';
import jestEach from 'jest-each';

import {
  deDupeId,
  getCarousel,
  getCarouselLength,
  getFirstIndex,
  getIsForwards,
  getLastIndex,
  getMargin,
  getTransform,
} from './helpers';
import {CarouselSlideProps as Slide} from './types';

describe('helpers', () => {
  describe('getCarouselLength', () => {
    jestEach`
show | slides
${1} | ${1}
${2} | ${3}
${3} | ${3}
${4} | ${5}
${5} | ${5}
    `.test('show: $show, slides: $slides', ({show, slides}) =>
      expect(getCarouselLength(show)).toEqual(slides)
    );
  });

  describe('getFirstIndex', () => {
    jestEach`
show | index | slides                  | first
${1} | ${0}  | ${['0', '1']}           | ${0}
${1} | ${1}  | ${['0', '1']}           | ${1}
${2} | ${0}  | ${['0', '1', '2']}      | ${2}
${2} | ${1}  | ${['0', '1', '2']}      | ${0}
${2} | ${2}  | ${['0', '1', '2']}      | ${1}
${3} | ${0}  | ${['0', '1', '2', '3']} | ${3}
${3} | ${1}  | ${['0', '1', '2', '3']} | ${0}
${3} | ${2}  | ${['0', '1', '2', '3']} | ${1}
${3} | ${3}  | ${['0', '1', '2', '3']} | ${2}
    `.test(
      'show: $show, index: $index, first: $first',
      ({show, index, slides, first}) =>
        expect(getFirstIndex({show, index, slides})).toEqual(first)
    );
  });

  describe('getLastIndex', () => {
    jestEach`
show | index | slides                  | last
${1} | ${0}  | ${['0', '1']}           | ${0}
${1} | ${1}  | ${['0', '1']}           | ${1}
${2} | ${0}  | ${['0', '1', '2']}      | ${1}
${2} | ${1}  | ${['0', '1', '2']}      | ${2}
${2} | ${2}  | ${['0', '1', '2']}      | ${0}
${3} | ${0}  | ${['0', '1', '2', '3']} | ${1}
${3} | ${1}  | ${['0', '1', '2', '3']} | ${2}
${3} | ${2}  | ${['0', '1', '2', '3']} | ${3}
${3} | ${3}  | ${['0', '1', '2', '3']} | ${0}
    `.test(
      'show: $show, index: $index, first: $first',
      ({show, index, slides, last}) =>
        expect(getLastIndex({show, index, slides})).toEqual(last)
    );
  });

  describe('getIsForwards', () => {
    jestEach`
slides                  | curr | next | forwards
${['0', '1']}           | ${0} | ${1} | ${true}
${['0', '1']}           | ${1} | ${0} | ${true}
${['0', '1', '2']}      | ${0} | ${1} | ${true}
${['0', '1', '2']}      | ${0} | ${2} | ${false}
${['0', '1', '2']}      | ${1} | ${0} | ${false}
${['0', '1', '2']}      | ${1} | ${2} | ${true}
${['0', '1', '2']}      | ${2} | ${0} | ${true}
${['0', '1', '2']}      | ${2} | ${1} | ${false}
${['0', '1', '2', '3']} | ${0} | ${1} | ${true}
${['0', '1', '2', '3']} | ${0} | ${2} | ${true}
${['0', '1', '2', '3']} | ${0} | ${3} | ${false}
${['0', '1', '2', '3']} | ${1} | ${0} | ${false}
${['0', '1', '2', '3']} | ${1} | ${2} | ${true}
${['0', '1', '2', '3']} | ${1} | ${3} | ${true}
${['0', '1', '2', '3']} | ${2} | ${0} | ${true}
${['0', '1', '2', '3']} | ${2} | ${1} | ${false}
${['0', '1', '2', '3']} | ${2} | ${3} | ${true}
${['0', '1', '2', '3']} | ${3} | ${0} | ${true}
${['0', '1', '2', '3']} | ${3} | ${1} | ${true}
${['0', '1', '2', '3']} | ${3} | ${2} | ${false}
  `.test(
      'from $curr to $next is forwards? $forwards',
      ({slides, curr, next, forwards}) =>
        expect(getIsForwards({curr, next, slides})).toEqual(forwards)
    );
  });

  describe('getCarousel: show=1', () => {
    const show = 1;
    let slides: Slide[];

    slides = generateSlides(2);
    jestEach`
allSlides | curr | next | slides
${slides} | ${0} | ${1} | ${[slides[0], slides[1]]}
${slides} | ${1} | ${0} | ${[slides[1], slides[0]]}
  `.test(
      'two slides: curr: $curr, next: $next',
      ({allSlides, curr, next, slides}) =>
        expect(getCarousel({show, slides: allSlides, curr, next})).toEqual(
          slides
        )
    );

    slides = generateSlides(3);
    jestEach`
allSlides | curr | next | slides
${slides} | ${0} | ${1} | ${[slides[0], slides[1]]}
${slides} | ${0} | ${2} | ${[slides[2], slides[0]]}
${slides} | ${1} | ${0} | ${[slides[0], slides[1]]}
${slides} | ${1} | ${2} | ${[slides[1], slides[2]]}
${slides} | ${2} | ${0} | ${[slides[2], slides[0]]}
${slides} | ${2} | ${1} | ${[slides[1], slides[2]]}
  `.test(
      'three slides: curr: $curr, next: $next',
      ({allSlides, curr, next, slides}) =>
        expect(getCarousel({show, slides: allSlides, curr, next})).toEqual(
          slides
        )
    );
  });

  describe('getCarousel: show=2', () => {
    const show = 2;
    let slides: Slide[];

    slides = generateSlides(3);
    jestEach`
allSlides      | curr | next | slides
${slides} | ${0} | ${1} | ${[
      slides[2],
      slides[0],
      slides[1],
      deDupeId(slides[2]),
    ]}
${slides} | ${0} | ${2} | ${[
      deDupeId(slides[1]),
      slides[2],
      slides[0],
      slides[1],
    ]}
${slides} | ${1} | ${0} | ${[
      deDupeId(slides[2]),
      slides[0],
      slides[1],
      slides[2],
    ]}
${slides} | ${1} | ${2} | ${[
      slides[0],
      slides[1],
      slides[2],
      deDupeId(slides[0]),
    ]}
${slides} | ${2} | ${0} | ${[
      slides[1],
      slides[2],
      slides[0],
      deDupeId(slides[1]),
    ]}
${slides} | ${2} | ${1} | ${[
      deDupeId(slides[0]),
      slides[1],
      slides[2],
      slides[0],
    ]}
  `.test(
      'handle dupes: curr: $curr, next: $next',
      ({allSlides, curr, next, slides}) =>
        expect(getCarousel({show, slides: allSlides, curr, next})).toEqual(
          slides
        )
    );
    slides = generateSlides(4);
    jestEach`
allSlides      | curr | next | slides
${slides}  | ${0} | ${2} | ${[
      slides[3],
      slides[0],
      slides[1],
      slides[2],
      deDupeId(slides[3]),
    ]}
${slides}  | ${1} | ${3} | ${[
      slides[0],
      slides[1],
      slides[2],
      slides[3],
      deDupeId(slides[0]),
    ]}
${slides}  | ${2} | ${0} | ${[
      slides[1],
      slides[2],
      slides[3],
      slides[0],
      deDupeId(slides[1]),
    ]}
${slides}  | ${3} | ${1} | ${[
      slides[2],
      slides[3],
      slides[0],
      slides[1],
      deDupeId(slides[2]),
    ]}
  `.test(
      'handle dupes: curr: $curr, next: $next',
      ({allSlides, curr, next, slides}) =>
        expect(getCarousel({show, slides: allSlides, curr, next})).toEqual(
          slides
        )
    );

    const sixSlides = ['0', '1', '2', '3', '4', '5'];
    jestEach`
allSlides    | curr | next | slides
${sixSlides} | ${0} | ${3} | ${['5', '0', '1', '2', '3', '4']}}
${sixSlides} | ${1} | ${4} | ${['0', '1', '2', '3', '4', '5']}
${sixSlides} | ${2} | ${5} | ${['1', '2', '3', '4', '5', '0']}
${sixSlides} | ${3} | ${0} | ${['2', '3', '4', '5', '0', '1']}
${sixSlides} | ${4} | ${1} | ${['3', '4', '5', '0', '1', '2']}
${sixSlides} | ${5} | ${2} | ${['4', '5', '0', '1', '2', '3']}
  `.test(
      'prefer forward: curr: $curr, next: $next',
      ({allSlides, curr, next, slides}) =>
        expect(getCarousel({show, slides: allSlides, curr, next})).toEqual(
          slides
        )
    );

    const eightSlides = ['0', '1', '2', '3', '4', '5', '6', '7'];
    jestEach`
allSlides     | curr | next | slides
${eightSlides} | ${0} | ${4} | ${['7', '0', '1', '3', '4', '5']}
${eightSlides} | ${1} | ${5} | ${['0', '1', '2', '4', '5', '6']}
${eightSlides} | ${2} | ${6} | ${['1', '2', '3', '5', '6', '7']}
${eightSlides} | ${3} | ${7} | ${['2', '3', '4', '6', '7', '0']}
${eightSlides} | ${4} | ${0} | ${['3', '4', '5', '7', '0', '1']}
${eightSlides} | ${5} | ${1} | ${['4', '5', '6', '0', '1', '2']}
${eightSlides} | ${6} | ${2} | ${['5', '6', '7', '1', '2', '3']}
${eightSlides} | ${7} | ${3} | ${['6', '7', '0', '2', '3', '4']}
  `.test(
      'max 2* carousel length: curr: $curr, next: $next',
      ({allSlides, curr, next, slides}) =>
        expect(getCarousel({show, slides: allSlides, curr, next})).toEqual(
          slides
        )
    );
  });

  describe('getMargin', () => {
    jestEach`
carousel                       | show | isForwards | margin
${['0']}                       | ${1} | ${null}    | ${0}
${['0', '1']}                  | ${1} | ${true}    | ${0}
${['0', '1']}                  | ${1} | ${false}   | ${-1}
${['0', '1', '2']}             | ${2} | ${null}    | ${-0.5}
${['0', '1', '2', '3']}        | ${2} | ${true}    | ${-0.5}
${['0', '1', '2', '3']}        | ${2} | ${false}   | ${-1.5}
${['0', '1', '2', '3', '4']}   | ${2} | ${true}    | ${-0.5}
${['0', '1', '2', '3', '4']}   | ${2} | ${false}   | ${-2.5}
${['0', '1', '2']}             | ${3} | ${null}    | ${0}
${['0', '1', '2', '3']}        | ${3} | ${true}    | ${0}
${['0', '1', '2', '3']}        | ${3} | ${false}   | ${-1}
    `.test('', ({carousel, show, isForwards, margin}) =>
      expect(getMargin({show, isForwards, carousel})).toEqual(margin)
    );
  });

  describe('getTransform', () => {
    jestEach`
carousel                     | show | isForwards | transform
${['0']}                     | ${1} | ${null}    | ${0}
${['0', '1']}                | ${1} | ${true}    | ${-1}
${['0', '1']}                | ${1} | ${false}   | ${1}
${['0', '1', '2', '3']}      | ${2} | ${true}    | ${-1}
${['0', '1', '2', '3']}      | ${2} | ${false}   | ${1}
${['0', '1', '2', '3', '4']} | ${2} | ${true}    | ${-2}
${['0', '1', '2', '3', '4']} | ${2} | ${false}   | ${2}
${['0', '1', '2', '3']}      | ${3} | ${true}    | ${-1}
${['0', '1', '2', '3']}      | ${3} | ${false}   | ${1}
    `.test('', ({carousel, show, isForwards, transform}) =>
      expect(getTransform({show, isForwards, carousel})).toEqual(transform)
    );
  });
});

function generateSlides(numberOfSlides: number): Slide[] {
  return [...Array(numberOfSlides)].map(generateSlide);
}
function generateSlide(): Slide {
  return {
    id: faker.random.uuid(),
    slide: faker.lorem.words(),
  };
}
