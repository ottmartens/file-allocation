import React from 'react';
import classnames from 'classnames';
import { colors, alphabet } from '../../constants';

import styles from './block.module.scss';

const Block = ({ isInvisible, value, isIndexBlock, isErrorBlock }) => (
  <div
    className={classnames(styles.block)}
    style={{
      background:
        isInvisible || isIndexBlock || !value
          ? 'transparent'
          : colors[alphabet.indexOf(value.toString().toLowerCase())],
      color: isErrorBlock ? 'red' : 'white'
    }}
  >
    {isIndexBlock ? `${value}` : isErrorBlock ? 'x' : null}
  </div>
);

export default Block;
