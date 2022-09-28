import {useRef, useEffect} from 'react';

const useEventListener = (
  eventName: string,
  handler: Function,
  el: any = {},
) => {
  const savedHandler = useRef();

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    (savedHandler.current as any) = handler;
  }, [handler]);

  useEffect(() => {
    // Make sure element supports addEventListener
    // On
    const isSupported = el && el.addEventListener;
    if (!isSupported) return;

    // Create event listener that calls handler function stored in ref
    const eventListener = (evt: any) => (savedHandler.current as any)(evt);

    // Add event listener
    el.addEventListener(eventName, eventListener);

    // Remove event listener on cleanup
    return () => {
      el.removeEventListener(eventName, eventListener);
    };
  }, [eventName, el]); // Re-run if eventName or element changes
};

export default useEventListener;
