"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { RiCheckLine } from "@remixicon/react";
import { useLang, useT } from "@/lib/i18n/context";
import type { Lang } from "@/lib/i18n/types";

const flagClass = "h-3.5 w-5 shrink-0 rounded-[2px] ring-1 ring-white/20";

function SpainFlag() {
  return (
    <svg viewBox="0 0 3 2" className={flagClass} aria-hidden>
      <rect width="3" height="2" fill="#AA151B" />
      <rect y="0.5" width="3" height="1" fill="#F1BF00" />
    </svg>
  );
}

function UKFlag() {
  return (
    <svg viewBox="0 0 60 30" className={flagClass} aria-hidden>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 60,30 M60,0 0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 60,30 M60,0 0,30" stroke="#C8102E" strokeWidth="3" />
      <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

const FLAGS: Record<Lang, React.ReactNode> = {
  es: <SpainFlag />,
  en: <UKFlag />,
};

const subscribeToClientMount = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  const t = useT();
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, right: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const mounted = useSyncExternalStore(
    subscribeToClientMount,
    getClientSnapshot,
    getServerSnapshot,
  );

  const options: { value: Lang; label: string }[] = [
    { value: "es", label: t.language.es },
    { value: "en", label: t.language.en },
  ];

  const updateCoords = () => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCoords({ top: rect.bottom + 8, right: window.innerWidth - rect.right });
  };

  const toggle = () => {
    if (!isOpen) updateCoords();
    setIsOpen((v) => !v);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handlePointer = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        !buttonRef.current?.contains(target) &&
        !menuRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    const handleReposition = () => updateCoords();
    document.addEventListener("mousedown", handlePointer);
    window.addEventListener("resize", handleReposition);
    window.addEventListener("scroll", handleReposition, true);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      window.removeEventListener("resize", handleReposition);
      window.removeEventListener("scroll", handleReposition, true);
    };
  }, [isOpen]);

  const choose = (value: Lang) => {
    setLang(value);
    setIsOpen(false);
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label={t.language.label}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={toggle}
        className="flex items-center gap-2 px-4 py-2 font-bold text-white hover:text-[#2CFF68] cursor-pointer select-none transition-colors duration-200"
      >
        {FLAGS[lang]}
        {lang.toUpperCase()}
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={menuRef}
                role="menu"
                initial={{ opacity: 0, scale: 0.95, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -8 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                style={{ top: coords.top, right: coords.right }}
                className="fixed z-200 min-w-37.5 flex flex-col gap-1 p-2 rounded-2xl bg-black/80 backdrop-blur-md border-[6px] border-black/20 origin-top-right"
              >
                {options.map((option) => {
                  const isActive = lang === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="menuitem"
                      onClick={() => choose(option.value)}
                      className={`flex items-center justify-between gap-3 px-4 py-2 font-bold cursor-pointer select-none rounded-xl transition-colors duration-200 ${
                        isActive
                          ? "text-[#2CFF68]"
                          : "text-white hover:bg-white/10"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {FLAGS[option.value]}
                        {option.label}
                      </span>
                      {isActive && <RiCheckLine size={16} />}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
