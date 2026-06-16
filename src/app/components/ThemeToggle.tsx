"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslations } from "next-intl";

/**
 * Light/dark toggle pill. Lives in the header beside the language switcher.
 * Renders a stable placeholder until mounted so the icon never mismatches
 * the no-flash class set before hydration.
 */
export function ThemeToggle({ size = 36 }: { size?: number }) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const t = useTranslations();
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";
  const label = isDark ? t("header.themeLight") : t("header.themeDark");

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        cursor: "pointer",
        color: "var(--text-soft)",
        backgroundColor: hovered ? "var(--surface-2)" : "var(--page-bg-alt)",
        border: "1px solid var(--border)",
        transition: "background-color 200ms ease, color 200ms ease, transform 200ms ease",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
        padding: 0,
      }}
    >
      {/* Crossfade sun/moon. Hidden until mounted to avoid an icon flip. */}
      <span style={{ position: "relative", width: 18, height: 18, opacity: mounted ? 1 : 0, transition: "opacity 200ms ease" }}>
        <Sun
          size={18}
          strokeWidth={2}
          style={{ position: "absolute", inset: 0, transition: "opacity 260ms ease, transform 360ms ease", opacity: isDark ? 1 : 0, transform: isDark ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0.6)" }}
        />
        <Moon
          size={18}
          strokeWidth={2}
          style={{ position: "absolute", inset: 0, transition: "opacity 260ms ease, transform 360ms ease", opacity: isDark ? 0 : 1, transform: isDark ? "rotate(90deg) scale(0.6)" : "rotate(0deg) scale(1)" }}
        />
      </span>
    </button>
  );
}
