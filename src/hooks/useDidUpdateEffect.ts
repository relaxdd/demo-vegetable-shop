import { useEffect, useRef } from "react";

type useDidUpdateEffectType = (effect: () => void, deps: unknown[]) => void;

const useDidUpdateEffect: useDidUpdateEffectType = (effect, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) effect();
    else didMount.current = true;
  }, deps);
};

export default useDidUpdateEffect;
