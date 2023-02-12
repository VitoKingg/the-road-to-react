import { useEffect, useState } from 'react';

export function useStorageState(
  key: string,
  initialState: string
): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}

function HookUtilies() {}

export default HookUtilies;
