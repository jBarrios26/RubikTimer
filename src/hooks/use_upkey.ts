import { useEffect } from 'react';
export default function useUpKey(callback: (event: KeyboardEvent) => void) {
  useEffect(() => {
    document.addEventListener('keyup', callback);

    return () => {
      document.removeEventListener('keyup', callback);
    };
  }, [callback]);
}
