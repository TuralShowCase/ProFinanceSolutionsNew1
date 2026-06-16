"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";

export type ThemePref = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

interface ThemeCtx {
  /** User preference: explicit "light"/"dark" or "system". */
  theme: ThemePref;
  /** Actual theme applied to the document after resolving "system". */
  resolvedTheme: ResolvedTheme;
  setTheme: (t: ThemePref) => void;
  /** Convenience: flip between the two visible themes. */
  toggleTheme: () => void;
}

const STORAGE_KEY = "pfs-theme";

const ThemeContext = createContext<ThemeCtx>({
  theme: "system",
  resolvedTheme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
});

function systemPrefersDark(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyTheme(resolved: ResolvedTheme) {
  const root = document.documentElement;
  root.classList.toggle("dark", resolved === "dark");
  root.style.colorScheme = resolved;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // The inline no-flash script (layout.tsx) has already applied the correct class
  // before paint. We initialise from the same sources to stay in sync, avoiding a flash.
  const [theme, setThemeState] = useState<ThemePref>("system");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");

  // Hydrate from storage on mount.
  useEffect(() => {
    const stored = (localStorage.getItem(STORAGE_KEY) as ThemePref | null) ?? "system";
    setThemeState(stored);
    const resolved: ResolvedTheme = stored === "system" ? (systemPrefersDark() ? "dark" : "light") : stored;
    setResolvedTheme(resolved);
    applyTheme(resolved);
  }, []);

  // React to OS scheme changes while the user is on "system".
  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const resolved: ResolvedTheme = mq.matches ? "dark" : "light";
      setResolvedTheme(resolved);
      applyTheme(resolved);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme]);

  const setTheme = useCallback((t: ThemePref) => {
    setThemeState(t);
    if (t === "system") localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, t);
    const resolved: ResolvedTheme = t === "system" ? (systemPrefersDark() ? "dark" : "light") : t;
    setResolvedTheme(resolved);
    applyTheme(resolved);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

/**
 * Inline script string injected before paint to set the initial theme class,
 * preventing a flash of the wrong theme (FOUC). Kept dependency-free and tiny.
 */
export const themeNoFlashScript = `(function(){try{var k='${STORAGE_KEY}';var s=localStorage.getItem(k);var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;var e=document.documentElement;if(d)e.classList.add('dark');e.style.colorScheme=d?'dark':'light';}catch(e){}})();`;
