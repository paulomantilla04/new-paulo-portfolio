import HeroSection from "@/components/HeroSection";
import TechCarousel from "@/components/TechCarousel";
import ExperienceSection from "@/components/ExperienceSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TechCarousel />
      <ExperienceSection />
      <section id="proyectos" className="min-h-screen">
        <h1>Proyectos</h1>
      </section>
      <section id="contacto" className="min-h-screen">
        <h1>Contacto</h1>
      </section>
    </main>
  );
}
