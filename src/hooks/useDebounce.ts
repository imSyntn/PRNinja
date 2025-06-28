import React, { useRef } from "react";

export const useDebounce = (func: () => void, time: number) => {
  const timer = useRef<any>(null);
  return (...args: any) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      func.apply(null, args);
    }, time);
  };
};
