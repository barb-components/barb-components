import React, {ReactElement} from 'react';

import TestComponent from '../TestComponent/TestComponent';
import AppFixture from './AppFixture';

export default {
  'Default Theme': (): ReactElement => (
    <AppFixture>
      <TestComponent />
    </AppFixture>
  ),
  'Brand Theme': (): ReactElement => (
    <AppFixture>
      <TestComponent theme="brand" />
    </AppFixture>
  ),
  'Light Theme': (): ReactElement => (
    <AppFixture>
      <TestComponent theme="light" />
    </AppFixture>
  ),
  'Dark Theme': (): ReactElement => (
    <AppFixture>
      <TestComponent theme="dark" />
    </AppFixture>
  ),
};
