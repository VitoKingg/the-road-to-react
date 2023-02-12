import { useEffect, useRef, useState } from 'react';

export function useStorageState(
  key: string,
  initialState: string
): [string, React.Dispatch<React.SetStateAction<string>>] {
  const isMounted = useRef(false);

  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      localStorage.setItem(key, value);
    }
  }, [key, value]);

  return [value, setValue];
}

function HookUtilies() {}

export default HookUtilies;
