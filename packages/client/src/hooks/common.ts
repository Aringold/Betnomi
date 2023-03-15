import { useEffect, useState } from 'react';

export const useIsTabActive = () => {
  const [isTabActive, setIsTabActive] = useState(true);

  useEffect(() => {
    const setVisibility = () => setIsTabActive(!document.hidden);
    document.addEventListener('visibilitychange', setVisibility);
    return () => document.removeEventListener('visibilitychange', setVisibility);
  }, []);

  return isTabActive;
};
