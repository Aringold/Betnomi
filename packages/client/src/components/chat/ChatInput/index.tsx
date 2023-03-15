import React, {
  ChangeEventHandler,
  FC,
  SyntheticEvent, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { BaseEmoji, Picker } from 'emoji-mart';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import { ReactComponent as SendIcon } from '@betnomi/libs/assets/img/icons/send.svg';
import { showErrorToast } from '@betnomi/libs/components/Toaster';
import { useUser } from 'hooks/useUser';
import { useModal } from 'hooks/useModal';
import { ModalType } from 'store/modal/types';
import styles from './styles.module.scss';
import { useTranslation } from '../../../i18n';
import 'emoji-mart/css/emoji-mart.css';
import './emoji.scss';
import { GifPicker } from '../GifPicker';

interface IProps {
  text: string;
  onSend: () => void
  onTextChange: (val: string) => void;
  onTipClick: () => void;
  onRainClick: () => void;
  onGIFClick: () => void;
  onGifSelect: (gifUrl: string) => void;
  onAttachmentsClick: ChangeEventHandler<HTMLInputElement>;
  onEmojiOpen: () => void;
  onEmojiClick: (emojiText: string) => void;
  disabled?: boolean;
  inputRef?: React.RefObject<HTMLTextAreaElement>;
  isEmojiPickerOpen?: boolean;
  isGifPickerOpen?: boolean;
}

const ChatInput: FC<IProps> = ({
  text,
  onSend,
  onTextChange,
  // onAttachmentsClick,
  onGIFClick,
  onGifSelect,
  onRainClick,
  onTipClick,
  onEmojiOpen,
  onEmojiClick,
  disabled,
  inputRef,
  isEmojiPickerOpen,
  isGifPickerOpen,
}) => {
  const { t } = useTranslation('chat');
  const onChange = (event: SyntheticEvent<HTMLTextAreaElement>) => onTextChange(event.currentTarget.value.trimStart()); 
  const { showModal } = useModal();
  const pickerParent = useRef<HTMLDivElement | null>(null);
  const [pickerWidth, setPickerWidth] = useState(pickerParent.current?.clientWidth ?? 0);

  const { isAuthorized } = useUser();

  useEffect(() => {
    if (isGifPickerOpen || isEmojiPickerOpen) {
      setPickerWidth(pickerParent.current?.clientWidth ?? 0);
    }
  }, [isGifPickerOpen, isEmojiPickerOpen]);

  useEffect(() => {
    const onResize = () => setPickerWidth(pickerParent.current?.clientWidth ?? 0);
    if (pickerParent.current) {
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }
  }, [pickerParent.current]);

  useEffect(() => {
    if (!isEmojiPickerOpen) {
      const scrollContainer = document.querySelector('.emojiPicker .emoji-mart-scroll');
      scrollContainer?.scrollTo(0, 0);
    }
  }, [isEmojiPickerOpen]);

  const emojiOpenHendler = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onEmojiOpen();
  };

  /* FIXME: Uncomment attach file button when its functionality will be fixed. */
  // const onAttachment = (event: SyntheticEvent<HTMLInputElement>) => {
  //   if (!isAuthorized) {
  //     event.preventDefault();
  //     showErrorToast(
  //       t('Please register or sign in to use this feature'),
  //     );
  //     showModal(ModalType.SignIn)();
  //   }
  // };

  return (
    <div ref={pickerParent} className={classNames(styles.wrapper, { [styles.disabled]: disabled })}>
      <div
        className={styles.input_wrap}
      >
        <div className={classNames(styles.input, {
          [styles.active]: text !== '',
        })}
        >
          <textarea
            value={text}
            onChange={onChange}
            ref={inputRef}
            readOnly={disabled}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && text) {
                onSend();
              }
            }}
          />
          <button className={styles.input_icon} onClick={emojiOpenHendler}>
            <FontIcon name={FontIconName.Smile} size={16} />
          </button>
          <div className={classNames('emojiPicker')}>
            {isEmojiPickerOpen && (
            <Picker
              style={{ width: pickerWidth }}
              set="emojione"
              onSelect={(emoji: BaseEmoji) => onEmojiClick(emoji.native)}
            />
            )}
          </div>
        </div>
        {text !== '' && (
          <button
            type="button"
            className={styles.submit}
            onClick={() => onSend()}
          >
            <SendIcon />
          </button>
        )}
      </div>

      <div className={styles.buttons}>
        <button
          className={styles.button}
          onClick={() => {
            if (!isAuthorized) {
              showErrorToast(
                t('Please register or sign in to use this feature'),
              );
              showModal(ModalType.SignIn)();
              return;
            }
            onTipClick();
          }}
          type="button"
        >
          <span className={styles.button_icon}>
            <FontIcon name={FontIconName.Bitcoin} size={16} />
          </span>

          <span>{t('Send a tip')}</span>
        </button>

        <div className={styles.separator} />

        <button
          className={styles.button}
          onClick={() => {
            if (!isAuthorized) {
              showErrorToast(
                t('Please register or sign in to use this feature'),
              );
              showModal(ModalType.SignIn)();
              return;
            }
            onRainClick();
          }}
          type="button"
        >
          <FontIcon name={FontIconName.Water} size={16} />
        </button>

        <div className={styles.spacer} />
        <button
          className={styles.button}
          onClick={onGIFClick}
          type="button"
        >
          <FontIcon name={FontIconName.GIF} size={16} />
        </button>
        {/* FIXME: Uncomment attach file button when its functionality will be fixed. */}
        {/* <button
          className={classNames(styles.button, styles.attach)}
          type="button"
        >
          <input
            type="file"
            onClick={onAttachment}
            onChange={onAttachmentsClick}
          />
          <FontIcon name={FontIconName.Attachments} size={16} />
        </button> */}
      </div>
      {isGifPickerOpen && <GifPicker onGifClick={onGifSelect} pickerWidth={pickerWidth} />}
    </div>
  );
};

export { ChatInput };
