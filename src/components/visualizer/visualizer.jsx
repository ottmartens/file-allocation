import React, { useState, useEffect } from 'react';

import { useInterval } from '../../hooks';
import { Allocator } from '../../utils';
import { BlockRow, Counter } from '..';

import styles from './visualizer.module.scss';

const Visualizer = ({ processes, started, setStarted, setError, error }) => {
  const [allocator, setAllocator] = useState(new Allocator(processes));
  const [stepCount, setStepCount] = useState(0);

  useInterval(
    () => {
      step();
    },
    started ? 1000 : null
  );

  useEffect(() => {
    if (started) {
      // Reset
      setStepCount(0);
      setError('');
      setAllocator(new Allocator(processes));
    }
  }, [setError, started, processes]);

  const step = () => {
    try {
      allocator.tick();
    } catch (err) {
      setError(err.message);
      setStarted(false);
    }

    // increment step count
    setStepCount(stepCount + 1);

    if (allocator.finished) setStarted(false);
  };

  return (
    <div className={styles.visualizer}>
      <BlockRow isIndexRow values={[...Array(50).keys()].map(x => ++x)} />
      {allocator.history.map((row, index) => (
        <BlockRow key={index} values={row} />
      ))}
      {error === 'Not enough space' && (
        <BlockRow isErrorRow values={Array(50).fill(null)} />
      )}

      <Counter
        stepCount={stepCount}
        finished={allocator.finished}
        fragmentationCountPercent={allocator.getFragmentationCountPercent()}
        fragmentationSpacePercent={allocator.getFragmentationSpacePercent()}
      />
    </div>
  );
};

export default Visualizer;
