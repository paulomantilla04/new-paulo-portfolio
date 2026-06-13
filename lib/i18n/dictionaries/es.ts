

export const es = {
  nav: {
    inicio: "Inicio",
    experiencia: "Experiencia",
    proyectos: "Proyectos",
    contacto: "Contacto",
  },
  language: {
    label: "Idioma",
    es: "Español",
    en: "Inglés",
  },
  hero: {
    greetingPrefix: "Hola, soy ",
    name: "Paulo Mantilla",
    descriptionPrefix: "Soy ",
    roleSoftware: "Ingeniero de Software",
    and: " y ",
    roleWeb: "Desarrollador Web",
    descriptionSuffix:
      ", especializado en el desarrollo de aplicaciones web modernas y escalables.",
  },
  experience: {
    title: "Experiencia",
    items: {
      nexen: {
        period: "Abril 2026 - Presente",
        role: "Desarrollador Fullstack",
        description:
          "Implementación de mejoras en plataformas para comercio exterior construidas con React y Laravel. Trabajo en el proceso completo desde diseñar e implementar interfaces, desarrollar APIs y la lógica de negocio.",
      },
      bydevs: {
        period: "Noviembre 2024 - Mayo 2025",
        role: "Desarrollador Fullstack",
        description:
          "Ayudé a desarrollar una plataforma community-driven para desarrolladores con arquitectura de microservicios en Spring Boot, auth JWT, internacionalización i18n y sistema de emails automatizados.",
      },
      donfer: {
        period: "Agosto 2024 - Octubre 2024",
        role: "Desarrollador Frontend",
        description:
          "Modernización de servicios digitales mediante un portal responsive para autogestión de citas e historial, y un dashboard administrativo para gestión de agendas y clientes.",
      },
    },
  },
  projects: {
    title: "Proyectos",
    seeMore: "Ver detalles ↓",
    seeLess: "Ver menos ↑",
    highlightsLabel: "LOGROS DESTACADOS",
    galleryLabel: "GALERÍA",
    viewSite: "Sitio Web",
    previewAlt: "Vista previa de {name}",
    prevImage: "Imagen anterior",
    nextImage: "Imagen siguiente",
    closeImage: "Cerrar",
    items: {
      artebymm: {
        subtitle: "Portafolio de Arte Digital",
        highlights: [
          "Desarrollé una página web para una artista, donde puede mostrar sus trabajos y contactar con ella.",
          "Se implementó un sistema de administración para la artista, donde puede ver las personas que se registran en una waitlist para ser contactadas.",
        ],
        captions: [
          "Página principal",
          "Página de retrato digital",
          "Dashboard de administrador",
        ],
      },
      ieee: {
        subtitle: "Página web de rama estudiantil de la IEEE",
        highlights: [
          "Desarrollé con mi equipo de la rama una página web para la rama estudiantil de la IEEE, donde se pueden ver los eventos, miembros y contactar con la rama.",
        ],
        captions: [
          "Página principal",
          "Página de eventos",
          "Página de miembros",
        ],
      },
      trueques: {
        subtitle: "Página web de marketplace de trueques",
        highlights: [
          "Desarrollé una página web de marketplace de trueques, donde se pueden comprar y vender productos, además de chat entre usuarios.",
        ],
        captions: [
          "Página de inicio de sesión",
          "Página principal",
          "Página de producto",
          "Dashboard de usuario",
          "Página de favoritos",
          "Chat entre usuarios",
        ],
      },
    },
  },
  footer: {
    role: "Ingeniero de Software | Desarrollador Web",
    cta: "¿Tienes un proyecto en mente? Hablemos.",
    rights: "Todos los derechos reservados.",
  },
  wizard: {
    trigger: "¿Tienes una idea?",
    eyebrow: "Cuéntame tu idea",
    step: "Paso",
    stepOf: "de",
    close: "Cerrar",
    back: "Atrás",
    continue: "Continuar",
    send: "Enviar",
    sending: "Enviando...",
    openWhatsapp: "Abrir WhatsApp",
    hints: {
      selectOne: "Por favor selecciona al menos una opción para continuar.",
      describe: "Por favor describe tu proyecto antes de continuar.",
      name: "Por favor ingresa tu nombre para continuar.",
      nameEmail: "Por favor ingresa tu nombre y email para continuar.",
      email: "Por favor ingresa tu email para continuar.",
      validEmail: "Por favor ingresa un email válido (ej. tu@email.com).",
    },
    toast: {
      successTitle: "¡Mensaje enviado! Te contactaré pronto.",
      successDesc: "Revisa tu bandeja de entrada y carpeta de spam.",
      errorTitle: "No se pudo enviar el mensaje.",
      errorDesc: "Intenta de nuevo o escríbeme directamente.",
    },
    steps: {
      projectType: {
        title: "¿Qué tipo de proyecto tienes en mente?",
        options: [
          "Sitio web / Landing page",
          "Aplicación web",
          "App móvil",
          "E-commerce",
          "No sé / Necesito asesoría",
        ],
      },
      features: {
        title: "¿Qué funcionalidades necesitas?",
        subtitle: "Puedes seleccionar varias",
        options: [
          "Autenticación / Login",
          "Base de datos",
          "Pagos en línea",
          "Panel de administración",
          "API / Integraciones",
          "Diseño UI/UX",
          "Integración con IA",
          "Multilenguaje",
        ],
      },
      budget: {
        title: "¿Cuál es tu presupuesto aproximado?",
        options: [
          "$5,000 - $10,000 MXN",
          "$10,000 - $20,000 MXN",
          "Más de $20,000 MXN",
          "Por definir",
        ],
      },
      timeline: {
        title: "¿En cuánto tiempo necesitas el proyecto?",
        options: [
          "Urgente (menos de 1 mes)",
          "1 - 3 meses",
          "3 - 6 meses",
          "Sin fecha límite",
        ],
      },
      description: {
        title: "Cuéntame más sobre tu idea",
        subtitle: "Entre más detalles, mejor puedo ayudarte",
        placeholder:
          "Describe tu proyecto, qué problema resuelve, quién lo usará, si tienes referencias visuales...",
      },
      contact: {
        title: "¿Cómo me contacto contigo?",
        nameLabel: "Nombre completo *",
        namePlaceholder: "Tu nombre",
        emailLabel: "Email *",
        emailPlaceholder: "tu@email.com",
        emailInvalid: "Ingresa un email válido (ej. tu@email.com).",
        companyLabel: "Empresa (opcional)",
        companyPlaceholder: "Nombre de tu empresa",
        howFoundLabel: "¿Cómo me encontraste? (opcional)",
        howFoundPlaceholder: "LinkedIn, recomendación, Google...",
      },
    },
    whatsapp: {
      greeting:
        "¡Hola Paulo! Soy {name} y me gustaría platicar sobre un proyecto.",
      projectType: "Tipo de proyecto",
      features: "Funcionalidades",
      budget: "Presupuesto",
      timeline: "Tiempo",
      description: "Descripción",
      company: "Empresa",
      howFound: "¿Cómo te encontré?",
    },
  },
};
