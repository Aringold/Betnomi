import React, { FC, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { useTranslation } from '@betnomi/libs/utils/i18n';
import Button from '../Button';
import styles from './styles.module.scss';
import RangeBar from '../RangeBar';

import ZoomLabelIcon from '../../assets/img/icons/zoom_label.svg';
import ZoomPlusIcon from '../../assets/img/icons/zoom_plus.svg';
import ZoomMinusIcon from '../../assets/img/icons/zoom_minus.svg';
import RotateLeftIcon from '../../assets/img/icons/redo_left.svg';
import RotateRightIcon from '../../assets/img/icons/redo_right.svg';
import DefaultIcon1 from '../../assets/img/profile/default1.png';
import DefaultIcon2 from '../../assets/img/profile/default2.png';
import DefaultIcon3 from '../../assets/img/profile/default3.png';

interface Props {
  avatar?: string;
  submit: (file: any) => void
}

export const MyAvatarEditor: FC<Props> = ({ avatar, submit }) => {
  const [scale, setScale] = useState(1.2);
  const [degree, setDegree] = useState(0);
  const [image, setImage] = useState(avatar);

  const { t } = useTranslation('main');
  const degreeTogleLeft = () => {
    setDegree(degree - 5);
  };

  const degreeTogleRight = () => {
    setDegree(degree + 5);
  };

  let editor: AvatarEditor;

  const setEditorRef = (instance: AvatarEditor) => { editor = instance; };

  const handleSubmit = () => {
    const canvas = editor.getImageScaledToCanvas().toDataURL();
    submit({ file: canvas });
  };

  const setDefaultImage = (img: string) => {
    setImage(img);
  };

  return (
    <>
      <div className={styles.content}>
        <div className={styles.avatar_back}>
          <div className={styles.avatar_border} />
          <AvatarEditor
            ref={setEditorRef}
            image={image}
            width={240}
            height={240}
            border={[168, 20]}
            borderRadius={120}
            color={[22, 26, 39, 0.7]} // RGBA
            scale={scale}
            rotate={degree}
          />
          <div className={styles.label_mask} />
          <p className={styles.zoom_label}>
            <img src={ZoomLabelIcon} alt="zoom" />
            Zoom and Adjust
          </p>
        </div>
        <div className={styles.controls_wrap}>

          <div className={styles.bar_wrap}>
            <img src={ZoomMinusIcon} alt="zoom minus" />
            <RangeBar values={[scale]} setValues={setScale} min={0.5} max={2} step={0.1} />
            <img src={ZoomPlusIcon} alt="zoom plus" />
          </div>

          <div className={styles.rotate_wrap}>
            <button className={styles.btn} onClick={degreeTogleLeft}>
              <img src={RotateLeftIcon} alt="left" />
            </button>
            <button className={styles.btn} onClick={degreeTogleRight}>
              <img src={RotateRightIcon} alt="right" />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.default_avatars}>
        <p className={styles.label}>{t('Default Avatar')}</p>
        <div className={styles.avatars_wrap}>
          <button onKeyDown={() => setDefaultImage(DefaultIcon1)} onClick={() => setDefaultImage(DefaultIcon1)}><img src={DefaultIcon1} alt="default" /></button>
          <button onKeyDown={() => setDefaultImage(DefaultIcon2)} onClick={() => setDefaultImage(DefaultIcon2)}><img src={DefaultIcon2} alt="default" /></button>
          <button onKeyDown={() => setDefaultImage(DefaultIcon3)} onClick={() => setDefaultImage(DefaultIcon3)}><img src={DefaultIcon3} alt="default" /></button>
        </div>
      </div>
      <Button
        type="submit"
        className={styles.submit_button}
        onClick={handleSubmit}
      >
        {t('Submit')}
      </Button>
    </>
  );
};
