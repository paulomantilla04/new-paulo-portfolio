import HeroSection from "@/components/HeroSection";
import TechCarousel from "@/components/TechCarousel";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TechCarousel />
      <section id="experiencia" className="min-h-screen">
        <h1>Experiencia</h1>
      </section>
      <section id="proyectos" className="min-h-screen">
        <h1>Proyectos</h1>
      </section>
      <section id="contacto" className="min-h-screen">
        <h1>Contacto</h1>
      </section>
    </main>
  );
}
