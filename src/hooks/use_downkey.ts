import { useEffect } from 'react';
export default function useDownKey(callback: (event: KeyboardEvent) => void) {
  useEffect(() => {
    document.addEventListener('keydown', callback);

    return () => {
      document.removeEventListener('keydown', callback);
    };
  }, [callback]);
}
