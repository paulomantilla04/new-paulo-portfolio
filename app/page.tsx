import HeroSection from "@/components/HeroSection";
import TechCarousel from "@/components/TechCarousel";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TechCarousel />
      <ExperienceSection />
      <ProjectsSection />
      <section id="contacto" className="min-h-screen">
        <h1>Contacto</h1>
      </section>
    </main>
  );
}
