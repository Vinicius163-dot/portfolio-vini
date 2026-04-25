import { useEffect, useState } from "react";

export function useCounter(target: number, isActive: boolean, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    setValue(0);
    let start: number | null = null;
    let raf: number;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, isActive, duration]);

  return value;
}
