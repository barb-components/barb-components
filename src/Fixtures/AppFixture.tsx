import React, {FC} from 'react';

import {ReactComponent as Logo} from '../assets/cherry-barb.svg';
import styles from './app-fixture.module.scss';

const AppFixture: FC = ({children}) => (
  <>
    <header className={styles.banner}>
      <h1>Barb Components</h1>
      <Logo />
      <p>React components with hooks.</p>
    </header>
    <div className={styles.wrapper}>{children}</div>
  </>
);
export default AppFixture;
