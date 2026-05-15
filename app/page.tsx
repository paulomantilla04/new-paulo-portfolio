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
    </main>
  );
}
