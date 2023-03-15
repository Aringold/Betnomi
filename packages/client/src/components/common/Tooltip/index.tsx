import React, { FC, useState } from 'react';
import styles from './styles.module.scss';

interface TooltipProps {
  content: React.ReactChild;
}

const Tooltip: FC<TooltipProps> = ({ children, content }) => {
  const [active, setActive] = useState(false);
  
  const handleShowTip = () => setActive(true);
  const handleHideTip = () => setActive(false);

  return (
    <div onMouseEnter={handleShowTip} onMouseLeave={handleHideTip}>
      {children}
      {active && (
      <div className={styles.tooltip}>
        {content}
      </div>
      )}
    </div>  
  );
};

export default Tooltip;
