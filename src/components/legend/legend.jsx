import React from 'react';

import { Block } from '..';

import styles from './legend.module.scss';

const Legend = ({ processes }) =>
  processes ? (
    <div className={styles.legend}>
      <div className={styles.legendItem}>
        <Block isInvisible />
        <div>File</div>
        <div>Size</div>
      </div>
      {processes.map(
        item =>
          item.size !== -1 && (
            <div key={item.index} className={styles.legendItem}>
              <Block value={item.letter} />
              <div>{item.letter}</div>
              <div>{item.size}</div>
            </div>
          )
      )}
    </div>
  ) : null;

export default Legend;
