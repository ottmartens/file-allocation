import React from 'react';

import styles from './counter.module.scss';

const Counter = ({
  stepCount,
  finished,
  fragmentationCountPercent,
  fragmentationSpacePercent
}) => (
  <div className={styles.counter}>
    {finished && (
      <>
        <div>
          <span className={styles.number}>{fragmentationCountPercent}</span> %
          of files are currently fragmented.
        </div>
        <div>
          <span className={styles.number}>{fragmentationSpacePercent}</span> %
          of consumed space is consumed by fragmented files.
        </div>
      </>
    )}
    <div>
      tick count: <span className={styles.number}>{stepCount}</span>
    </div>
  </div>
);

export default Counter;
