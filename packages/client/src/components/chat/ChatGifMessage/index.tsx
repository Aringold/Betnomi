import React, { useState, useEffect } from 'react';

import { Loading } from '@betnomi/libs/components/Loading'; 
import styles from './styles.module.scss';

interface Props {
  url: string;
  onLoad: () => void;
}

export const ChatGifMesssage: React.FC<Props> = ({ url, onLoad }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onLoad();
  }, [isLoading]);
  
  return (
    <>
      <div className={styles.loadingContiner}>
        {
         isLoading && (
         <div className={styles.loading}>
           <Loading />
         </div>
         )
       }
        <img
          style={{ visibility: isLoading ? 'hidden' : 'visible' }}
          className={styles.image}
          src={url}
          alt=""
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </>
  );
};
