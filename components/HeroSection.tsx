"use client";

import DitherBackground from "@/components/DitherBackground";
import { Montserrat, Special_Gothic_Expanded_One } from "next/font/google";
import Button from "@/components/Button";
import ProjectWizard from "@/components/ProjectWizard";
import { RiLinkedinBoxFill, RiGithubFill, RiAttachmentLine, RiInstagramFill } from "@remixicon/react";
import { useT } from "@/lib/i18n/context";


const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const specialGothicExpandedOne = Special_Gothic_Expanded_One({
  subsets: ["latin"],
  weight: ["400"],
  fallback: ["sans-serif"],
});

export default function HeroSection() {
  const t = useT();
  return (
    <section id="inicio" className="relative w-full h-screen overflow-hidden">
      <DitherBackground />

      <div className="absolute inset-0 z-1 bg-linearj-to-b from-transparent to-black pointer-events-none" />

      <div className={`relative z-10 flex flex-col items-center justify-center h-full text-white `}>
        <h1 className={`text-4xl lg:text-6xl font-black ${specialGothicExpandedOne.className} text-center leading-tight max-w-2xl`}>{t.hero.greetingPrefix}<span className="text-[#2CFF68]">{t.hero.name}</span></h1>
        <p className={`text-md px-6 lg:text-xl mt-4 text-white font-medium ${montserrat.className} text-center max-w-2xl`}>
          {t.hero.descriptionPrefix}<span className="text-[#2CFF68] font-bold">{t.hero.roleSoftware}</span>{t.hero.and}<span className="text-[#2CFF68] font-bold">{t.hero.roleWeb}</span>{t.hero.descriptionSuffix}
        </p>
        <div className="flex flex-col items-center gap-4 mt-8 md:justify-start">
          <ProjectWizard />
          <div className="flex flex-row gap-4">
            <Button icon={<RiLinkedinBoxFill size={36} />} label="LinkedIn" type="iconOnly" href="https://www.linkedin.com/in/paulomantilla04/"/>
            <Button icon={<RiGithubFill size={36} />} label="GitHub" type="iconOnly" href="https://github.com/paulomantilla04" />
            <Button icon={<RiAttachmentLine size={36} />} label="CV" type="iconOnly" download="resume.pdf" src="resume.pdf"/>
            <Button icon={<RiInstagramFill size={36} />} label="Instagram" type="iconOnly" href="https://www.instagram.com/paulomanher/" />
          </div>
        </div>
      </div>
    </section>
  );
}