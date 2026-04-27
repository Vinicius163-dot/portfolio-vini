import { useEffect, useState } from "react";

export function useTypewriter(
  words: string[],
  typeSpeed = 75,
  deleteSpeed = 38,
  pauseMs = 1800
) {
  const [displayed, setDisplayed] = useState(words[0] ?? "");
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("pausing");

  useEffect(() => {
    if (words.length === 0) return;
    const current = words[wordIdx];

    if (phase === "pausing") {
      const t = setTimeout(() => setPhase("deleting"), pauseMs);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (displayed.length === 0) {
        setWordIdx((i) => (i + 1) % words.length);
        setPhase("typing");
        return;
      }
      const t = setTimeout(() => setDisplayed((d) => d.slice(0, -1)), deleteSpeed);
      return () => clearTimeout(t);
    }

    if (phase === "typing") {
      if (displayed.length === current.length) {
        setPhase("pausing");
        return;
      }
      const t = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        typeSpeed
      );
      return () => clearTimeout(t);
    }
  }, [displayed, phase, wordIdx, words, typeSpeed, deleteSpeed, pauseMs]);

  return displayed;
}
