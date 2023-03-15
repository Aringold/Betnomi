/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import * as React from 'react';
import { Range, getTrackBackground } from 'react-range';
import styles from './styles.module.scss';

const MIN = 0;
const MAX = 100;

interface RagngeProps {
  value?: number;
  step: number;
  disabled?: boolean
}

const Labeled: React.FC<RagngeProps> = ({
  value = 0.00,
  disabled,
  step = 1,
  ...props
}) => {
  const [values, setValues] = React.useState([value]);

  return (
    <div className={styles.wrap}>
      <Range
        {...props}
        disabled={disabled}
        values={values}
        step={step}
        min={MIN}
        max={MAX}
        onChange={(values) => setValues(values)}
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
                  values, colors: ['#6AD035', '#212536'], min: MIN, max: MAX, 
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
          >
            <div
              className={styles.value}
            >
              {`${values[0]} %`}
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default Labeled;
