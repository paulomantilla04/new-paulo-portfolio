"use client";

import { Montserrat, Special_Gothic_Expanded_One } from "next/font/google";
import Button from "@/components/Button";
import Grainient from "@/components/Grainient";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const specialGothicExpandedOne = Special_Gothic_Expanded_One({
  subsets: ["latin"],
  weight: ["400"],
  fallback: ["sans-serif"],
});

export default function Footer() {
  return (
    <footer
      id="contacto"
      className="relative w-full bg-black py-16 px-6 flex flex-col items-center justify-center gap-6 text-center overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
      <Grainient
          color1="#d5009c"
          color2="#000000"
          color3="#750056"
          timeSpeed={0.1}
          colorBalance={0}
          warpStrength={4}
          warpFrequency={12}
          warpSpeed={6}
          warpAmplitude={80}
          blendAngle={106}
          blendSoftness={0}
          rotationAmount={220}
          noiseScale={2}
          grainAmount={0.4}
          grainScale={10}
          grainAnimated
          contrast={2}
          gamma={1}
          saturation={0.8}
          centerX={0}
          centerY={0}
          zoom={1}
        />
      </div>



      <div className="relative z-10 flex flex-col items-center justify-center gap-6 text-center">

        <h1 className={`${specialGothicExpandedOne.className} text-white font-bold text-4xl md:text-6xl uppercase`}>
          Paulo Mantilla
        </h1>

        <p
          className={`${montserrat.className} text-white text-sm md:text-base font-medium tracking-wide`}
        >
          Ingeniero de Software | Desarrollador Web
        </p>

        <div className="w-16 h-[2px] bg-white rounded-full" />

        <p className={`${montserrat.className} text-white text-sm max-w-sm`}>
          ¿Tienes un proyecto en mente? Hablemos.
        </p>

        <Button
          icon={<MdEmail />}
          label="paulomantilla@gmail.com"
          href="mailto:paulomantilla@gmail.com"
        />

        <div className="flex gap-3">
          <Button
            icon={<FaGithub />}
            label="GitHub"
            type="iconOnly"
            href="https://github.com/paulomantilla04"
          />
          <Button
            icon={<FaLinkedin />}
            label="LinkedIn"
            type="iconOnly"
            href="https://linkedin.com/in/paulomantilla04"
          />
          <Button
            icon={<FaInstagram />}
            label="Instagram"
            type="iconOnly"
            href="https://instagram.com/paulomanher"
          />
        </div>

        <div className="w-16 h-[2px] bg-white/20 rounded-full" />

        <p className={`${montserrat.className} text-white text-xs`}>
          © {new Date().getFullYear()} Paulo Mantilla. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
