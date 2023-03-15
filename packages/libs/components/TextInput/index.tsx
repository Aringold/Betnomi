import React, {
  FC, HTMLProps, useCallback, useState, 
} from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { FontIcon, FontIconName } from '../FontIcon';
import { TextInputWrap } from '../TextInputWrap';

export interface TextInputProps extends HTMLProps<HTMLInputElement> {
  inputClasses?: string;
  left?: JSX.Element | string;
  right?: JSX.Element | string;
  error?: boolean;
  hasError?: boolean;
  handleClearBtn?: any;
  className?: string;
  withSeparator?: boolean;
}

const IconRenderer: FC<{ error?: boolean, withSeparator?: boolean, disabled?: boolean; }> = ({
  children, error, withSeparator, disabled, 
}) =>
  (children ? (
    <div className={classNames(styles.icon, {
      [styles.text]: typeof children === 'string',
      [styles.error]: error,
      [styles.separator]: withSeparator, 
      [styles.disabled]: disabled,
    })}
    >
      {children}
    </div>
  ) : null);

const TextInput: FC<TextInputProps> = ({
  type = 'text',
  inputClasses,
  left,
  right,
  hasError,
  className,
  withSeparator,
  ...props 
}) => {
  const [revealed, setRevealed] = useState(false);
  const toggleRevealed = useCallback(() => setRevealed(!revealed), [setRevealed, revealed]);

  return (
    <TextInputWrap error={hasError} className={className}>
      <IconRenderer error={hasError} withSeparator={withSeparator} disabled={props.disabled}>{left}</IconRenderer>

      <input
        type={revealed ? 'text' : type}
        {...props}
        className={classNames(styles.input, inputClasses,
          { [styles.disabled]: props.disabled })}
        size={1}
      />

      <IconRenderer>{right}</IconRenderer>

      {type === 'password' && (
        <IconRenderer>
          <button className={styles.reveal} onClick={toggleRevealed} type="button">
            <FontIcon name={FontIconName.View} size={16} />
          </button>
        </IconRenderer>
      )}

      {type === 'search' && props.value && (
        <button className={styles.search} onClick={props.handleClearBtn} type="button">
          <FontIcon name={FontIconName.Close} size={16} />
        </button>
      )}
    </TextInputWrap>
  );
};

export { TextInput };
