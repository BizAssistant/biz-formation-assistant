// src/components/hooks/useAutosave.ts
import { useEffect, useRef } from "react";

export default function useAutosave(key, state) {
  // Saves state to localStorage whenever it changes (debounced)
  const timer = useRef(null);

  useEffect(() => {
    if (!key) return;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(state));
      } catch (e) {
        console.warn("Autosave failed", e);
      }
    }, 400);
    return () => clearTimeout(timer.current);
  }, [key, state]);

  // read only helper
  return {
    load: () => {
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
      } catch (e) {
        return null;
      }
    },
    clear: () => localStorage.removeItem(key),
  };
}
