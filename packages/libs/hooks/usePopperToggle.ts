import { useState } from 'react';

export const usePopperToggle = (btnRef: React.RefObject<HTMLButtonElement> | React.RefObject<HTMLDivElement>) => {
  const [visible, setVisibility] = useState(false);

  function handleDocumentClick(event: MouseEvent) {
    if (btnRef.current == null || (btnRef.current).contains(event.target as Node)) {
      return;
    }
    setVisibility(false);
  }

  function handleDropdownClick() {
    setVisibility(!visible);
  }

  return {
    visible, handleDocumentClick, handleDropdownClick,
  };
};
