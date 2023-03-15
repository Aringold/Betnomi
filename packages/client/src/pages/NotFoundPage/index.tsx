import React, { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import notFoundLogo from '@betnomi/libs/assets/img/notFound.svg';
import { Button } from '@betnomi/libs/components';
import { Routes } from '../../constants/routes';

import { useUserUI } from '../../hooks/useUserUI';

import styles from './styles.module.scss';

interface IProps {}

const NotFoundPage: FC<IProps> = () => {
  const history = useHistory();
  const { setIsShowMoreActive } = useUserUI();

  useEffect(() => {
    setIsShowMoreActive(false);
    return () => setIsShowMoreActive(true);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <img src={notFoundLogo} alt="Not found" />
      </div>
      <div className={styles.content}>
        <h2>
          Page not found
        </h2>
        <p>
          The page you are trying to access does not exist or has been moved.
          <br />
          Try going back to our homepage
        </p>
        <Button className={styles.homeBtn} onClick={() => history.push(Routes.Homepage)}>Home Page</Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
