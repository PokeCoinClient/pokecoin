import { useState, useEffect } from 'react';

let hidden;
let visibilityChange;

if (typeof document.hidden !== 'undefined') {
  hidden = 'hidden';
  visibilityChange = 'visibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
  hidden = 'msHidden';
  visibilityChange = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
  hidden = 'webkitHidden';
  visibilityChange = 'webkitvisibilitychange';
}

export default function usePageVisibility() {
  const [visibilityStatus, setVisibilityStatus] = useState(document[hidden]);

  useEffect(() => {
    function handleVisibilityChange() {
      setVisibilityStatus(document[hidden]);
    }

    document.addEventListener(visibilityChange, handleVisibilityChange);

    return () => {
      document.removeEventListener(visibilityChange, handleVisibilityChange);
    };
  }, []);

  return visibilityStatus;
}
