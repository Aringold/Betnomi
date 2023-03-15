import { RefObject, useCallback, useState } from 'react';
import { useOnClickOutside } from '@betnomi/client/src/utils/helpers';

export const useFocusEvent = (initialState = false, currentRef?: RefObject<HTMLElement>) => {
  const [focused, setFocused] = useState(initialState);

  const onFocus = useCallback(() => setFocused(true), [setFocused]);
  const offFocus = useCallback(() => setTimeout(() => setFocused(false)), [setFocused]);
  const onBlur = useCallback(() => setTimeout(() => setFocused(false), 300), [setFocused]);

  useOnClickOutside(currentRef, () => setFocused(false));
  return {
    focused, onBlur, offFocus, onFocus, 
  };
};
