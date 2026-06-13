"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { RiCloseLine, RiMenuLine } from "@remixicon/react";
import { useT } from "@/lib/i18n/context";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const SECTION_IDS = ["inicio", "experiencia", "proyectos", "contacto"] as const;

export default function Navbar() {
  const t = useT();
  const SECTIONS = SECTION_IDS.map((id) => ({ id, label: t.nav[id] }));
  const [activeId, setActiveId] = useState<string>("inicio");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveId(id);
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-100 items-center gap-2 px-2 py-2 rounded-2xl bg-black/40 backdrop-blur-md border-[6px] border-black/20">
        {SECTIONS.map((section) => {
          const isActive = activeId === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => handleClick(e, section.id)}
              className={`group relative px-5 py-2 font-bold cursor-pointer select-none z-10 transition-colors duration-200 ${
                isActive ? "text-black" : "text-white hover:text-[#2CFF68]"
              }`}
            >
              <motion.div
                className="absolute inset-0 bg-[#2CFF68] rounded-xl -z-10"
                initial={false}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              />
              {!isActive && (
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                />
              )}
              {section.label}
            </a>
          );
        })}
        <div className="ml-1 border-l border-white/10 pl-1">
          <LanguageSwitcher />
        </div>
      </nav>

      <button
        type="button"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((v) => !v)}
        className="md:hidden fixed top-6 right-6 z-50 p-3 rounded-2xl bg-black/40 backdrop-blur-md border-[6px] border-black/20 text-[#2CFF68] cursor-pointer"
      >
        {isOpen ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden fixed top-20 right-6 z-100 min-w-45 flex flex-col gap-1 p-2 rounded-2xl bg-black/80 backdrop-blur-md border-[6px] border-black/20 origin-top-right"
          >
            {SECTIONS.map((section) => {
              const isActive = activeId === section.id;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => handleClick(e, section.id)}
                  style={{ color: isActive ? "#000" : "#fff" }}
                  className="relative px-5 py-3 font-bold cursor-pointer select-none z-10 transition-colors duration-200 text-center rounded-xl"
                >
                  <motion.div
                    className="absolute inset-0 bg-[#2CFF68] rounded-xl -z-10"
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  />
                  {section.label}
                </a>
              );
            })}
            <div className="mt-1 border-t border-white/10 pt-2 flex justify-center">
              <LanguageSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
