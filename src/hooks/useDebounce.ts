import { useRef } from "react";

export function useDebounce(func: (...args: unknown[]) => void, time: number) {
  const timer = useRef<number | null>(null);

  return (...args: unknown[]) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      func(...args);
    }, time);
  };
}
