"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { RiCloseLine, RiMenuLine } from "@remixicon/react";

const SECTIONS = [
  { id: "inicio", label: "Inicio" },
  { id: "experiencia", label: "Experiencia" },
  { id: "proyectos", label: "Proyectos" },
  { id: "contacto", label: "Contacto" },
] as const;

export default function Navbar() {
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
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[min(92vw,640px)] flex flex-col items-center">
      <nav className="w-full md:w-auto flex items-center justify-between md:justify-center gap-2 px-2 py-2 rounded-2xl bg-black/40 backdrop-blur-md border-[6px] border-black/20">
        <div className="hidden md:flex items-center gap-2">
          {SECTIONS.map((section) => {
            const isActive = activeId === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => handleClick(e, section.id)}
                style={{ color: isActive ? "#000" : "#fff" }}
                className="relative px-5 py-2 font-bold cursor-pointer select-none z-10 transition-colors duration-200"
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
        </div>

        <span className="md:hidden px-3 py-2 font-bold text-white select-none">
          {SECTIONS.find((s) => s.id === activeId)?.label ?? "Menú"}
        </span>
        <button
          type="button"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-[#2CFF68] text-black cursor-pointer"
        >
          {isOpen ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden mt-3 w-full flex flex-col gap-1 p-2 rounded-2xl bg-black/40 backdrop-blur-md border-[6px] border-black/20"
          >
            {SECTIONS.map((section) => {
              const isActive = activeId === section.id;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => handleClick(e, section.id)}
                  style={{ color: isActive ? "#000" : "#fff" }}
                  className="relative px-5 py-3 font-bold cursor-pointer select-none z-10 transition-colors duration-200 text-center"
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
