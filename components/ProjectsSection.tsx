"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Montserrat, Special_Gothic_Expanded_One } from "next/font/google";
import { AnimatePresence, motion } from "motion/react";
import { FaGithub } from "react-icons/fa";
import {
  FiChevronLeft,
  FiChevronRight,
  FiExternalLink,
  FiX,
} from "react-icons/fi";
import Button from "@/components/Button";
import ShinyText from "@/components/ShinyText";
import { RiCheckboxCircleLine } from "@remixicon/react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const specialGothicExpandedOne = Special_Gothic_Expanded_One({
  subsets: ["latin"],
  weight: ["400"],
  fallback: ["sans-serif"],
});

const PROJECTS = [
  {
    title: "Artebymm",
    subtitle: "Portafolio de Arte Digital",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Supabase", "Resend"],
    thumbnail: "/artebymm/1.webp",
    highlights: [
      "Desarrollé una página web para una artista, donde puede mostrar sus trabajos y contactar con ella.",
      "Se implementó un sistema de administración para la artista, donde puede ver las personas que se registran en una waitlist para ser contactadas.",
    ],
    gallery: [
      { src: "/artebymm/1.webp", caption: "Página principal" },
      { src: "/artebymm/2.webp", caption: "Página de retrato digital" },
      { src: "/artebymm/3.webp", caption: "Dashboard de administrador" },
    ],
    github: null,
    website: "https://artebymm.com",
  },
  {
    title: "IEEE ESTl",
    subtitle: "Página web de rama estudiantil de la IEEE",
    tags: ["React", "Tailwind CSS", "TypeScript", "Resend", "Clerk"],
    thumbnail: "/ieee/1.webp",
    highlights: [
      "Desarrollé con mi equipo de la rama una página web para la rama estudiantil de la IEEE, donde se pueden ver los eventos, miembros y contactar con la rama.",
    ],
    gallery: [
      { src: "/ieee/1.webp", caption: "Página principal" },
      { src: "/ieee/2.webp", caption: "Página de eventos" },
      { src: "/ieee/3.webp", caption: "Página de miembros" },
    ],
    github: null,
    website: "https://ieee-estl.com/",
  },
  {
    title: "Trueques Tlahue",
    subtitle: "Página web de marketplace de trueques",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Supabase"],
    thumbnail: "/trueques/2.webp",
    highlights: [
      "Desarrollé una página web de marketplace de trueques, donde se pueden comprar y vender productos, además de chat entre usuarios.",
    ],
    gallery: [
      { src: "/trueques/1.webp", caption: "Página de inicio de sesión" },
      { src: "/trueques/2.webp", caption: "Página principal" },
      { src: "/trueques/3.webp", caption: "Página de producto" },
      { src: "/trueques/4.webp", caption: "Dashboard de usuario" },
      { src: "/trueques/5.webp", caption: "Página de favoritos" },
      { src: "/trueques/6.webp", caption: "Chat entre usuarios" },
    ],
    github: "https://github.com/paulomantilla04/trueques-tlahue",
    website: null,
  },
];

type Project = (typeof PROJECTS)[number];

interface ProjectCardProps {
  project: Project;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  onImageClick: (imageIndex: number) => void;
}

function ProjectCard({
  project,
  index,
  isOpen,
  onToggle,
  onImageClick,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
    >
      <div className="relative h-48 md:h-64 overflow-hidden">
        <Image
          src={project.thumbnail}
          alt={`Vista previa de ${project.title}`}
          fill
          sizes="(max-width: 768px) 100vw, 672px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <div className="absolute bottom-4 left-4">

          <h3
            className={`${specialGothicExpandedOne.className} text-white text-xl md:text-2xl font-black`}
          >
            {project.title}
          </h3>
          <p className={`${montserrat.className} text-white/60 text-sm`}>
            {project.subtitle}
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`${montserrat.className} border border-white/20 bg-black/10 backdrop-blur-md text-white/70 text-xs rounded-full px-3 py-1`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-t border-white/10">
        <button
          type="button"
          onClick={onToggle}
          className={`${montserrat.className} text-white/70 hover:text-white text-sm font-medium transition-colors`}
          aria-expanded={isOpen}
        >
          {isOpen ? "Ver menos ↑" : "Ver detalles ↓"}
        </button>

        <div className="flex gap-2">
          {project.github && (
            <Button icon={<FaGithub />} label="GitHub" href={project.github} size="small" />
          )}
          {project.website && (
            <Button
              icon={<FiExternalLink />}
              label="Sitio Web"
              href={project.website}
              size="small"
            />
          )}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pt-4 pb-2">
              <div>
                <p
                  className={`${montserrat.className} text-white/40 text-xs tracking-widest mb-3`}
                >
                  LOGROS DESTACADOS
                </p>
                <ul className="flex flex-col gap-2 mb-6">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2 items-center">
                      <span className="flex-shrink-0">
                        <RiCheckboxCircleLine className="text-[#2CFF68] text-lg" />
                      </span>
                      <p className={`${montserrat.className} text-white/80 text-sm leading-relaxed`}>
                        {highlight}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p
                  className={`${montserrat.className} text-white/40 text-xs tracking-widest mb-3`}
                >
                  GALERÍA
                </p>
                <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-3 scrollbar-hide -mx-4 px-4">
                  {project.gallery.map((image, i) => (
                    <div
                      key={image.src}
                      onClick={() => onImageClick(i)}
                      className="snap-start flex-shrink-0 w-48 md:w-56 rounded-xl overflow-hidden relative group cursor-pointer h-36 md:h-44"
                    >
                      <Image
                        src={image.src}
                        alt={image.caption}
                        fill
                        sizes="(max-width: 768px) 192px, 224px"
                        className="object-cover"
                      />
                      <div
                        className={`${montserrat.className} absolute bottom-0 left-0 right-0 bg-black/60 text-center text-xs py-1 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
                      >
                        {image.caption}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

type LightboxState = {
  images: { src: string; caption: string }[];
  index: number;
};

export default function ProjectsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const prev = useCallback(
    () =>
      setLightbox((lb) =>
        lb
          ? {
              ...lb,
              index: (lb.index - 1 + lb.images.length) % lb.images.length,
            }
          : null,
      ),
    [],
  );

  const next = useCallback(
    () =>
      setLightbox((lb) =>
        lb ? { ...lb, index: (lb.index + 1) % lb.images.length } : null,
      ),
    [],
  );

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, prev, next, closeLightbox]);

  useEffect(() => {
    if (lightbox) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <>
      <section
        id="proyectos"
        className="relative px-4 pt-16 pb-36 md:pt-20 md:px-6 bg-black overflow-hidden"
      >
        <div className="max-w-3xl mx-auto relative z-50">
          <div className="mb-12 text-center">
            <ShinyText
              text="Proyectos"
              speed={2}
              color="#2CFF68"
              shineColor="#A3FFC0"
              spread={150}
              direction="left"
              className={`text-4xl font-black lg:text-6xl ${specialGothicExpandedOne.className}`}
            />
          </div>

          <div className="flex flex-col gap-6">
            {PROJECTS.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex((current) => (current === index ? null : index))
                }
                onImageClick={(imageIndex) =>
                  setLightbox({ images: project.gallery, index: imageIndex })
                }
              />
            ))}
          </div>

        </div>

      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative flex flex-col items-center max-w-4xl w-full px-4"
              onClick={(e) => e.stopPropagation()}
              key={lightbox.index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative w-full h-[60vh] md:h-[75vh] rounded-2xl overflow-hidden">
                <Image
                  src={lightbox.images[lightbox.index].src}
                  alt={lightbox.images[lightbox.index].caption}
                  fill
                  sizes="(max-width: 768px) 100vw, 896px"
                  className="object-contain"
                />
              </div>

              <p
                className={`${montserrat.className} text-white/60 text-sm mt-3`}
              >
                {lightbox.images[lightbox.index].caption}
              </p>

              <p
                className={`${montserrat.className} text-white/30 text-xs mt-1`}
              >
                {lightbox.index + 1} / {lightbox.images.length}
              </p>
            </motion.div>

            <button
              type="button"
              aria-label="Imagen anterior"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors"
            >
              <FiChevronLeft size={20} />
            </button>

            <button
              type="button"
              aria-label="Imagen siguiente"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors"
            >
              <FiChevronRight size={20} />
            </button>

            <button
              type="button"
              aria-label="Cerrar"
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors"
            >
              <FiX size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
