import { MutableRefObject, useRef, useMemo, DependencyList } from "react";

/**
 * Returns a ref object whose content is calculated by given callback
 * and is updated every time given dependencies change.
 * @param fn Function to calculate the value of ref.
 * @param deps Array of values on which calculated value depends.
 */
export function useRefMemo<T>(
  fn: () => T,
  deps?: DependencyList,
): MutableRefObject<T> {
  const resultRef = useRef<T>((null as unknown) as T);
  return useMemo(() => {
    resultRef.current = fn();
    return resultRef;
  }, deps);
}
