import { useRef, DependencyList, useMemo } from "react";

/**
 * Memoizes result of given function.
 * Unlike useMemo, objects are compared by shallow equality.
 * @param fn Function to calculate a value.
 * @param deps Array of values on which the value depends.
 */
export function useShallowMemo<T extends {}>(
  fn: () => T,
  deps: DependencyList,
): T {
  const current = useRef<T>(null as any);
  return useMemo(() => {
    const res = fn();
    const prev = current.current;
    if (prev == null) {
      // initialization
      current.current = res;
      return res;
    }
    // compare with previous one
    const isChanged = (() => {
      if (prev === res) {
        return false;
      }

      const resKeys = Object.keys(res);
      const prevKeys = Object.keys(prev);

      return (
        resKeys.length !== prevKeys.length ||
        resKeys.some(key => (prev as any)[key] !== (res as any)[key])
      );
    })();

    if (isChanged) {
      current.current = res;
    }
    return current.current;
  }, deps);
}

