"use client";

import { useState, useEffect } from "react";

const WA_NUMBER   = "994505550011";
const WA_TEXT     = encodeURIComponent("Salam! ProFinance Solutions haqqında məlumat almaq istəyirəm.");
const DISPLAY_NUM = "+994 50 555 00 11";

function WhatsAppIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function WhatsAppButton() {
  const [hovered,  setHovered]  = useState(false);
  const [mounted,  setMounted]  = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <a
      href={`https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ilə əlaqə"
      className={hovered ? undefined : "wa-idle"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:       "fixed",
        bottom:         28,
        right:          28,
        zIndex:         9998,
        display:        "flex",
        alignItems:     "center",
        gap:            hovered ? 10 : 0,
        backgroundColor:"#25D366",
        borderRadius:   50,
        padding:        hovered ? "13px 20px 13px 15px" : "13px",
        boxShadow:      hovered
          ? "0 8px 32px rgba(37,211,102,0.5), 0 3px 12px rgba(0,0,0,0.18)"
          : undefined,
        textDecoration: "none",
        transition:     "padding 320ms cubic-bezier(0.34,1.56,0.64,1), gap 320ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 280ms ease",
        overflow:       "hidden",
        whiteSpace:     "nowrap",
        fontFamily:     "var(--font-inter), 'Inter', sans-serif",
      }}
    >
      <WhatsAppIcon />
      <span
        style={{
          fontSize:   13,
          fontWeight: 600,
          color:      "white",
          maxWidth:   hovered ? 180 : 0,
          opacity:    hovered ? 1 : 0,
          overflow:   "hidden",
          transition: "max-width 320ms cubic-bezier(0.34,1.56,0.64,1), opacity 200ms ease",
          letterSpacing: "0.01em",
        }}
      >
        {DISPLAY_NUM}
      </span>
    </a>
  );
}
