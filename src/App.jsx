import React, { useState, useEffect } from 'react';

import { Select, Button, Visualizer, Legend, Link } from './components';
import { timelineOptions } from './constants';
import { parseTimelineString } from './utils';

import styles from './App.module.scss';

const App = () => {
  const [timeline, setTimeline] = useState(timelineOptions[0]);
  const [started, setStarted] = useState(false);
  const [processes, setProcesses] = useState([]);

  const [error, setError] = useState('');

  useEffect(() => {
    if (timeline !== 'custom') {
      setProcesses(parseTimelineString(timeline, setError));
    }
  }, [timeline]);

  return (
    <div className={styles.scheduler}>
      <Link />
      <header className={styles.header}>
        <h1 className={styles.title}>File allocation</h1>
        <div className={styles.controls}>
          <div className={styles.timeline}>
            <h3>File queue</h3>
            <Select
              options={timelineOptions}
              onChange={({ target: { value } }) => {
                setTimeline(value);
                setStarted(false);
              }}
            />
            {timeline === 'custom' && (
              <input
                className={styles.customTimeline}
                onBlur={e => {
                  setProcesses(parseTimelineString(e.target.value, setError));
                }}
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    setProcesses(parseTimelineString(e.target.value, setError));
                  }
                }}
              />
            )}
          </div>
        </div>
        <Button
          disabled={error === 'Invalid pattern!'}
          label={started ? 'STOP' : 'START'}
          onClick={() => {
            if (started) {
              setStarted(false);
            } else {
              setStarted(true);
            }
          }}
        />
        {error && <span className={styles.error}>{error}</span>}
      </header>
      <Legend processes={processes} />
      <Visualizer
        processes={processes}
        started={started}
        setStarted={setStarted}
        setError={setError}
        error={error}
      />
    </div>
  );
};

export default App;
