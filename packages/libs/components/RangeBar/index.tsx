/* eslint-disable jsx-a11y/no-static-element-interactions */
import * as React from 'react';
import { Range, getTrackBackground } from 'react-range';
import styles from './styles.module.scss';

interface Props {
  values: number[];
  setValues: any;
  min: number;
  max: number;
  step: number;
}

const SuperSimple: React.FC<Props> = ({
  values, setValues, min, max, step, 
}) => (
  <div className={styles.wrap}>
    <Range
      values={values}
      step={step}
      min={min}
      max={max}
      onChange={(values2) => setValues(values2)}
      renderTrack={({ props, children }) => (
        <div
          onMouseDown={props.onMouseDown}
          onTouchStart={props.onTouchStart}
          style={{ ...props.style }}
          className={styles.track_wrap}
        >
          <div
            ref={props.ref}
            className={styles.track}
            style={{
              background: getTrackBackground({
                values, colors: ['#6AD035', '#212536'], min, max, 
              }), 
            }}
          >
            {children}
          </div>
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          {...props}
          style={{
            ...props.style, display: 'flex', justifyContent: 'center', alignItems: 'center', 
          }}
          className={styles.thumb}
        />
      )}
    />
  </div>
);

export default SuperSimple;
