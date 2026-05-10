import DitherBackground from "@/components/DitherBackground";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function HeroSection() {
  return (
    <section className="relative w-screen h-screen overflow-hidden">
      <DitherBackground />
      
      <div className={`relative z-10 flex flex-col items-center justify-center h-full text-white ${montserrat.className}`}>
        <h1 className="text-6xl font-black">Hola, soy Paulo Mantilla</h1>
        <p className="text-xl mt-4 text-white/70">
          Soy un estudiante en Ingeniería de Software y Desarrollador Web, 
          especializado en el desarrollo de aplicaciones web modernas y escalables.
        </p>
      </div>
    </section>
  );
}