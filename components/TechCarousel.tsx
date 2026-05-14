import { FaReact, FaPython, FaCloudflare } from "react-icons/fa";
import { SiTypescript, SiSpring, SiNextdotjs } from "react-icons/si";
import { FaLaravel } from "react-icons/fa6";
import { RiTailwindCssFill } from "react-icons/ri";
import { BiLogoPostgresql } from "react-icons/bi";
import { CgFigma } from "react-icons/cg";
import { GrSwift } from "react-icons/gr";
import { DiRedis } from "react-icons/di";
import { Special_Gothic_Expanded_One } from "next/font/google";

const specialGothicExpandedOne = Special_Gothic_Expanded_One({
  subsets: ["latin"],
  weight: ["400"],
  fallback: ["sans-serif"],
});

const TECHS = [
  { icon: <FaReact />, label: "React", color: "#fff" },
  { icon: <SiTypescript />, label: "TypeScript", color: "#fff" },
  { icon: <RiTailwindCssFill />, label: "Tailwind", color: "#fff" },
  { icon: <CgFigma />, label: "Figma", color: "#fff" },
  { icon: <SiNextdotjs />, label: "Next.js", color: "#ffffff" },
  { icon: <GrSwift />, label: "Swift", color: "#fff" },
  { icon: <DiRedis />, label: "Redis", color: "#fff" },
  { icon: <FaCloudflare />, label: "Cloudflare", color: "#fff" },
  { icon: <BiLogoPostgresql />, label: "PostgreSQL", color: "#fff" },
  { icon: <FaLaravel />, label: "Laravel", color: "#fff" },
  { icon: <SiSpring />, label: "Spring Boot", color: "#fff" },
  { icon: <FaPython />, label: "Python", color: "#fff" },
];

type Tech = (typeof TECHS)[number];

function TechItem({ tech }: { tech: Tech }) {
  return (
    <div className="flex flex-row items-center gap-3 px-8 py-2 cursor-pointer group">
      <span
        className="transition-transform duration-300 group-hover:scale-110 block will-change-transform"
        style={{ color: tech.color, fontSize: "2.5rem" }}
      >
        {tech.icon}
      </span>
      <span className={`${specialGothicExpandedOne.className} text-white/60 text-sm whitespace-nowrap`}>
        {tech.label}
      </span>
    </div>
  );
}

export default function TechCarousel() {
  return (
    <section className="relative py-12 bg-black">
      <div className="mx-auto max-w-3xl overflow-hidden relative">
        <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div className="py-2">
          <div className="animate-scroll flex w-max items-center">
            {[...TECHS, ...TECHS].map((tech, i) => (
              <TechItem key={i} tech={tech} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
