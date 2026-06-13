import type { Dictionary } from "../types";

export const en: Dictionary = {
  nav: {
    inicio: "Home",
    experiencia: "Experience",
    proyectos: "Projects",
    contacto: "Contact",
  },
  language: {
    label: "Language",
    es: "Spanish",
    en: "English",
  },
  hero: {
    greetingPrefix: "Hi, I'm ",
    name: "Paulo Mantilla",
    descriptionPrefix: "I'm a ",
    roleSoftware: "Software Engineer",
    and: " and ",
    roleWeb: "Web Developer",
    descriptionSuffix:
      " specialized in building modern, scalable web applications.",
  },
  experience: {
    title: "Experience",
    items: {
      nexen: {
        period: "April 2026 - Present",
        role: "Fullstack Developer",
        description:
          "Building improvements for foreign-trade platforms built with React and Laravel. I'm involved in the whole process, from designing and building interfaces to developing APIs and business logic.",
      },
      bydevs: {
        period: "November 2024 - May 2025",
        role: "Fullstack Developer",
        description:
          "Helped build a community-driven platform for developers, with a Spring Boot microservices architecture, JWT auth, internationalization (i18n), and an automated email system.",
      },
      donfer: {
        period: "August 2024 - October 2024",
        role: "Frontend Developer",
        description:
          "Modernized digital services with a responsive portal where clients manage their own appointments and history, plus an admin dashboard for handling schedules and clients.",
      },
    },
  },
  projects: {
    title: "Projects",
    seeMore: "See details ↓",
    seeLess: "See less ↑",
    highlightsLabel: "KEY ACHIEVEMENTS",
    galleryLabel: "GALLERY",
    viewSite: "Website",
    previewAlt: "Preview of {name}",
    prevImage: "Previous image",
    nextImage: "Next image",
    closeImage: "Close",
    items: {
      artebymm: {
        subtitle: "Digital Art Portfolio",
        highlights: [
          "Built a website for an artist to showcase her work and make it easy for people to reach out.",
          "Built an admin system where the artist can see everyone who joins her waitlist to be contacted.",
        ],
        captions: [
          "Home page",
          "Digital portrait page",
          "Admin dashboard",
        ],
      },
      ieee: {
        subtitle: "Website for an IEEE student branch",
        highlights: [
          "Worked with my branch team to build a website for the IEEE student branch, where you can browse events and members or get in touch with the branch.",
        ],
        captions: [
          "Home page",
          "Events page",
          "Members page",
        ],
      },
      trueques: {
        subtitle: "Barter marketplace website",
        highlights: [
          "Built a barter marketplace where users can buy and sell products and chat with each other.",
        ],
        captions: [
          "Login page",
          "Home page",
          "Product page",
          "User dashboard",
          "Favorites page",
          "User-to-user chat",
        ],
      },
    },
  },
  footer: {
    role: "Software Engineer | Web Developer",
    cta: "Got an idea? Let's talk.",
    rights: "All rights reserved.",
  },
  wizard: {
    trigger: "Got an idea?",
    eyebrow: "Tell me about your idea",
    step: "Step",
    stepOf: "of",
    close: "Close",
    back: "Back",
    continue: "Continue",
    send: "Send",
    sending: "Sending...",
    openWhatsapp: "Open WhatsApp",
    hints: {
      selectOne: "Please select at least one option to continue.",
      describe: "Please describe your project before continuing.",
      name: "Please enter your name to continue.",
      nameEmail: "Please enter your name and email to continue.",
      email: "Please enter your email to continue.",
      validEmail: "Please enter a valid email (e.g. you@email.com).",
    },
    toast: {
      successTitle: "Message sent! I'll get back to you soon.",
      successDesc: "Check your inbox and spam folder.",
      errorTitle: "Your message couldn't be sent.",
      errorDesc: "Please try again or reach out to me directly.",
    },
    steps: {
      projectType: {
        title: "What kind of project do you have in mind?",
        options: [
          "Website / Landing page",
          "Web application",
          "Mobile app",
          "E-commerce",
          "Not sure / I need advice",
        ],
      },
      features: {
        title: "What features do you need?",
        subtitle: "You can pick more than one",
        options: [
          "Authentication / Login",
          "Database",
          "Online payments",
          "Admin panel",
          "API / Integrations",
          "UI/UX Design",
          "AI integration",
          "Multi-language",
        ],
      },
      budget: {
        title: "What's your approximate budget?",
        options: [
          "MXN 5,000 - 10,000",
          "MXN 10,000 - 20,000",
          "Over MXN 20,000",
          "Not sure yet",
        ],
      },
      timeline: {
        title: "How soon do you need it?",
        options: [
          "Urgent (less than 1 month)",
          "1 - 3 months",
          "3 - 6 months",
          "No deadline",
        ],
      },
      description: {
        title: "Tell me more about your idea",
        subtitle: "The more details, the better I can help",
        placeholder:
          "Describe your project, what problem it solves, who'll use it, any visual references you have...",
      },
      contact: {
        title: "How can I reach you?",
        nameLabel: "Full name *",
        namePlaceholder: "Your name",
        emailLabel: "Email *",
        emailPlaceholder: "you@email.com",
        emailInvalid: "Enter a valid email (e.g. you@email.com).",
        companyLabel: "Company (optional)",
        companyPlaceholder: "Your company name",
        howFoundLabel: "How did you find me? (optional)",
        howFoundPlaceholder: "LinkedIn, referral, Google...",
      },
    },
    whatsapp: {
      greeting:
        "Hi Paulo! I'm {name} and I'd love to talk about a project.",
      projectType: "Project type",
      features: "Features",
      budget: "Budget",
      timeline: "Timeline",
      description: "Description",
      company: "Company",
      howFound: "How I found you",
    },
  },
};