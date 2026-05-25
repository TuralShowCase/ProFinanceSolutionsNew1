"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ContactModal } from "../components/ContactModal";

interface ContactModalCtx {
  openContact: () => void;
}

const ContactModalContext = createContext<ContactModalCtx>({ openContact: () => {} });

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <ContactModalContext.Provider value={{ openContact: () => setOpen(true) }}>
      {children}
      <ContactModal open={open} onClose={() => setOpen(false)} />
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  return useContext(ContactModalContext);
}
