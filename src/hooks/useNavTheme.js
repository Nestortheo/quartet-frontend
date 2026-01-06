import { useEffect, useState } from "react";
/*
export default function useNavTheme(triggerPx = 90) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsDark(window.scrollY > triggerPx);
    }

    onScroll(); // run once on mount
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [triggerPx]);

  return isDark;
}
  */


export default function useNavTheme(triggerPx = 90) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const compute = () => setIsDark(window.scrollY > triggerPx);

    compute(); // ✅ run once immediately (fixes "only updates after scroll")
    window.addEventListener("scroll", compute, { passive: true });

    return () => window.removeEventListener("scroll", compute);
  }, [triggerPx]);

  return isDark;
}