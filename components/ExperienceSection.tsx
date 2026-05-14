"use client";

import { useRef } from "react";
import { Montserrat, Special_Gothic_Expanded_One } from "next/font/google";
import { motion, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import ShinyText from "@/components/ShinyText";

const EXPERIENCES = [
  {
    period: "Abril 2026 - Presente",
    role: "Analista Web",
    company: "@ Nexen E-Logistics",
    description: "Resolución de tickets técnicos y desarrollo de mejoras en plataformas internas construidas con React y Laravel como sistemas de soporte.",
  },
  {
    period: "Noviembre 2024 - Mayo 2025",
    role: "Desarrollador Fullstack",
    company: "@ ByDevs",
    description: "Ayudé a desarrollar una plataforma community-driven para desarrolladores con arquitectura de microservicios en Spring Boot, auth JWT, internacionalización i18n y sistema de emails automatizados.",
  },
  {
    period: "Agosto 2024 - Octubre 2024",
    role: "Desarrollador Frontend",
    company: "@ Grupo Automotriz \"Don Fer\"",
    description: "Modernización de servicios digitales mediante un portal responsive para autogestión de citas e historial, y un dashboard administrativo para gestión de agendas y clientes.",
  },
];

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const specialGothicExpandedOne = Special_Gothic_Expanded_One({
  subsets: ["latin"],
  weight: ["400"],
  fallback: ["sans-serif"],
});

interface DotItemProps {
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}

function DotItem({ index, total, scrollYProgress }: DotItemProps) {
  const threshold = total <= 1 ? 0 : index / (total - 0.55);
  const range = 0.08;
  const backgroundColor = useTransform(
    scrollYProgress,
    [threshold, threshold + range],
    ["#000000", "#2CFF68"]
  );

  return (
    <motion.div
      style={{ backgroundColor }}
      className="relative z-10 mt-5 h-3 w-3 flex-shrink-0 rounded-full border-2 border-[#2CFF68]"
    />
  );
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 30%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      id="experiencia"
      className="relative bg-black px-4 py-16 md:px-6 md:py-20"
    >
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <ShinyText
            text="Experiencia"
            speed={2}
            delay={0}
            color="#2CFF68"
            shineColor="#A3FFC0"
            spread={150}
            direction="left"
            yoyo={false}
            pauseOnHover={false}
            disabled={false}
            className={`text-4xl font-black leading-tight lg:text-6xl ${specialGothicExpandedOne.className}`}
          />
        </div>

        <div className="relative flex flex-col">
          <div className="absolute left-[13px] top-0 h-full w-[3px] -translate-x-1/2 rounded-full bg-white/10" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[13px] top-0 w-[3px] -translate-x-1/2 rounded-full bg-[#2CFF68]"
          />

          {EXPERIENCES.map((exp, index) => {
            return (
              <div
                key={`${exp.period}-${exp.role}`}
                className="mb-6 flex flex-row items-start gap-4"
              >
                <div className="flex w-7 flex-shrink-0 justify-center">
                  <DotItem
                    index={index}
                    total={EXPERIENCES.length}
                    scrollYProgress={scrollYProgress}
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6"
                >
                  <p
                    className={`${montserrat.className} mb-1 text-sm font-medium text-white/50`}
                  >
                    {exp.period}
                  </p>
                  <h3
                    className={`${specialGothicExpandedOne.className} text-md md:text-lg`}
                  >
                    <span className="text-white">{exp.role}</span>{" "}
                    <span className="text-[#2CFF68]">{exp.company}</span>
                  </h3>
                  <p
                    className={`${montserrat.className} mt-3 text-sm leading-relaxed text-white/60`}
                  >
                    {exp.description}
                  </p>
                </motion.div>
              </div>
            );
          })}

        </div>


      </div>
    </section>
  );
}