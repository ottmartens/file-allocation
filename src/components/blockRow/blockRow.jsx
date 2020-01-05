import React from 'react';

import { Block } from '..';

import styles from './blockRow.module.scss';

const BlockRow = ({values, isIndexRow, isErrorRow}) => {
    return <div className={styles.blockRow}>
        {values.map((value, index) => <Block isErrorBlock={isErrorRow} key={index} value={value} isIndexBlock={isIndexRow} />)}
    </div>
}

export default BlockRow;