"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiX, FiChevronRight, FiChevronLeft } from "react-icons/fi";
import {
    FcIdea,
    FcGlobe,
    FcEngineering,
    FcCellPhone,
    FcShop,
    FcDecision,
    FcFlashOn,
    FcPlanner,
    FcCalendar,
    FcAlarmClock,
} from "react-icons/fc";
import { Montserrat, Special_Gothic_Expanded_One } from "next/font/google";
import { toast } from "sonner";
import Button from "@/components/Button";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const specialGothicExpandedOne = Special_Gothic_Expanded_One({
    subsets: ["latin"],
    weight: ["400"],
    fallback: ["sans-serif"],
});

type FormData = {
    projectType: string;
    features: string[];
    budget: string;
    timeline: string;
    description: string;
    name: string;
    email: string;
    company: string;
    howFound: string;
};

const initialFormData: FormData = {
    projectType: "",
    features: [],
    budget: "",
    timeline: "",
    description: "",
    name: "",
    email: "",
    company: "",
    howFound: "",
};

const totalSteps = 6;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const isValidEmail = (email: string) => emailRegex.test(email.trim());

type StepProps = {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    montserrat: { className: string };
    specialGothic?: { className: string };
};

const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "60%" : "-60%", opacity: 0 }),
    center: { x: "0%", opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-60%" : "60%", opacity: 0 }),
};

export default function ProjectWizard() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [direction, setDirection] = useState(1);
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [showHint, setShowHint] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const isStepValid = (): boolean => {
        switch (currentStep) {
            case 0:
                return formData.projectType !== "";
            case 1:
                return formData.features.length > 0;
            case 2:
                return formData.budget !== "";
            case 3:
                return formData.timeline !== "";
            case 4:
                return formData.description.trim().length > 0;
            case 5:
                return (
                    formData.name.trim() !== "" && isValidEmail(formData.email)
                );
            default:
                return true;
        }
    };

    const hintMessage = () => {
        if (currentStep === 5) {
            if (formData.name.trim() === "")
                return "Por favor ingresa tu nombre y email para continuar.";
            if (formData.email.trim() === "")
                return "Por favor ingresa tu email para continuar.";
            if (!isValidEmail(formData.email))
                return "Por favor ingresa un email válido (ej. tu@email.com).";
            return "Por favor ingresa tu nombre y email para continuar.";
        }
        if (currentStep === 4)
            return "Por favor describe tu proyecto antes de continuar.";
        return "Por favor selecciona al menos una opción para continuar.";
    };

    const goNext = () => {
        if (!isStepValid()) {
            setShowHint(true);
            setTimeout(() => setShowHint(false), 2500);
            return;
        }
        setShowHint(false);
        setDirection(1);
        setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
    };

    const handleSubmit = async () => {
        if (!isStepValid()) {
            setShowHint(true);
            setTimeout(() => setShowHint(false), 2500);
            return;
        }
        setIsSending(true);

        try {
            const res = await fetch("/api/send-project", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Error al enviar");

            toast.success("¡Mensaje enviado! Te contactaré pronto.", {
                description: `Respuesta a ${formData.email}`,
                duration: 4000,
            });

            closeWizard();
        } catch (err) {
            toast.error("No se pudo enviar el mensaje.", {
                description: "Intenta de nuevo o escríbeme directamente.",
                duration: 4000,
            });
        } finally {
            setIsSending(false);
        }
    };
    const goBack = () => {
        setDirection(-1);
        setCurrentStep((prev) => Math.max(prev - 1, 0));
    };
    const closeWizard = () => {
        setIsOpen(false);
        setTimeout(() => {
            setCurrentStep(0);
            setFormData({ ...initialFormData });
        }, 400);
    };

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeWizard();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    useEffect(() => {
        setShowHint(false);
    }, [currentStep]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <>
            <Button
                icon={<FcIdea size={36} />}
                label="¿Tienes una idea?"
                type="iconWithText"
                size="small"
                onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(true);
                }}
            />

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeWizard}
                    >
                        <motion.div
                            className="w-full max-w-lg bg-[#0a0a0a] rounded-3xl border border-white/10 overflow-hidden"
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between px-6 pt-6">
                                <div>
                                    <p
                                        className={`${montserrat.className} text-white/40 text-xs tracking-widest uppercase`}
                                    >
                                        Cuéntame tu idea
                                    </p>
                                    <p
                                        className={`${montserrat.className} text-white/20 text-xs mt-1`}
                                    >
                                        Paso {currentStep + 1} de {totalSteps}
                                    </p>
                                </div>
                                <button
                                    onClick={closeWizard}
                                    className="text-white/40 hover:text-white transition-colors p-1"
                                    aria-label="Cerrar"
                                >
                                    <FiX size={18} />
                                </button>
                            </div>

                            <div className="mx-6 mt-4 h-[2px] bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-[#2CFF68] rounded-full"
                                    animate={{
                                        width: `${((currentStep + 1) / totalSteps) * 100}%`,
                                    }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                />
                            </div>

                            <div className="overflow-hidden min-h-[280px] px-6 py-6">
                                <AnimatePresence mode="wait" custom={direction}>
                                    <motion.div
                                        key={currentStep}
                                        custom={direction}
                                        variants={variants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        {currentStep === 0 && (
                                            <StepProjectType
                                                formData={formData}
                                                setFormData={setFormData}
                                                montserrat={montserrat}
                                                specialGothic={specialGothicExpandedOne}
                                            />
                                        )}
                                        {currentStep === 1 && (
                                            <StepFeatures
                                                formData={formData}
                                                setFormData={setFormData}
                                                montserrat={montserrat}
                                            />
                                        )}
                                        {currentStep === 2 && (
                                            <StepBudget
                                                formData={formData}
                                                setFormData={setFormData}
                                                montserrat={montserrat}
                                            />
                                        )}
                                        {currentStep === 3 && (
                                            <StepTimeline
                                                formData={formData}
                                                setFormData={setFormData}
                                                montserrat={montserrat}
                                            />
                                        )}
                                        {currentStep === 4 && (
                                            <StepDescription
                                                formData={formData}
                                                setFormData={setFormData}
                                                montserrat={montserrat}
                                            />
                                        )}
                                        {currentStep === 5 && (
                                            <StepContact
                                                formData={formData}
                                                setFormData={setFormData}
                                                montserrat={montserrat}
                                            />
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            <AnimatePresence>
                                {showHint && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className={`${montserrat.className} text-[#2CFF68]/70 text-xs text-center px-6 pb-2`}
                                    >
                                        {hintMessage()}
                                    </motion.p>
                                )}
                            </AnimatePresence>

                            <div className="flex items-center justify-between px-6 pb-6">
                                <button
                                    onClick={goBack}
                                    disabled={currentStep === 0}
                                    className={`${montserrat.className} flex items-center gap-1 text-sm transition-colors ${currentStep === 0
                                            ? "text-white/20 pointer-events-none"
                                            : "text-white/50 hover:text-white"
                                        }`}
                                >
                                    <FiChevronLeft size={16} /> Atrás
                                </button>
                                <button
                                    onClick={
                                        currentStep === totalSteps - 1 ? handleSubmit : goNext
                                    }
                                    disabled={!isStepValid() || isSending}
                                    className={`${montserrat.className} flex items-center gap-1 text-sm font-bold px-5 py-2 rounded-full transition-all duration-200 ${isStepValid() && !isSending
                                            ? "bg-[#2CFF68] text-black hover:bg-[#A3FFC0] cursor-pointer"
                                            : "bg-white/10 text-white/30 cursor-not-allowed"
                                        }`}
                                >
                                    {currentStep === totalSteps - 1
                                        ? isSending
                                            ? "Enviando..."
                                            : "Enviar"
                                        : "Continuar"}
                                    <FiChevronRight size={16} />
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

const projectTypes = [
    { icon: <FcGlobe />, label: "Sitio web / Landing page" },
    { icon: <FcEngineering />, label: "Aplicación web" },
    { icon: <FcCellPhone />, label: "App móvil" },
    { icon: <FcShop />, label: "E-commerce" },
    { icon: <FcDecision />, label: "No sé / Necesito asesoría" },
];

function StepProjectType({ formData, setFormData, montserrat, specialGothic }: StepProps) {
    return (
        <div>
            <h3
                className={`${specialGothic?.className ?? ""} text-white text-xl mb-5 leading-snug`}
            >
                ¿Qué tipo de proyecto tienes en mente?
            </h3>
            <div className="grid grid-cols-2 gap-3">
                {projectTypes.map((option) => {
                    const selected = formData.projectType === option.label;
                    return (
                        <div
                            key={option.label}
                            onClick={() =>
                                setFormData((prev) => ({ ...prev, projectType: option.label }))
                            }
                            className={`border rounded-xl p-4 cursor-pointer transition-all ${selected
                                    ? "border-[#2CFF68] bg-[#2CFF68]/10"
                                    : "border-white/10 hover:border-[#2CFF68]/50"
                                }`}
                        >
                            <div className="text-2xl mb-2 [&>svg]:w-6 [&>svg]:h-6">
                                {option.icon}
                            </div>
                            <p
                                className={`${montserrat.className} text-white/80 text-sm leading-snug`}
                            >
                                {option.label}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

const featureOptions = [
    "Autenticación / Login",
    "Base de datos",
    "Pagos en línea",
    "Panel de administración",
    "API / Integraciones",
    "Diseño UI/UX",
    "Integración con IA",
    "Multilenguaje",
];

function StepFeatures({ formData, setFormData, montserrat }: StepProps) {
    const toggleFeature = (feature: string) => {
        setFormData((prev) => ({
            ...prev,
            features: prev.features.includes(feature)
                ? prev.features.filter((f) => f !== feature)
                : [...prev.features, feature],
        }));
    };

    return (
        <div>
            <h3
                className={`${montserrat.className} text-white text-xl font-semibold mb-1 leading-snug`}
            >
                ¿Qué funcionalidades necesitas?
            </h3>
            <p className={`${montserrat.className} text-white/40 text-xs mb-5`}>
                Puedes seleccionar varias
            </p>
            <div className="flex flex-wrap gap-2">
                {featureOptions.map((feature) => {
                    const selected = formData.features.includes(feature);
                    return (
                        <div
                            key={feature}
                            onClick={() => toggleFeature(feature)}
                            className={`${montserrat.className} border rounded-full px-4 py-2 text-sm cursor-pointer transition-all ${selected
                                    ? "border-[#2CFF68] bg-[#2CFF68]/10 text-[#2CFF68]"
                                    : "border-white/10 text-white/60 hover:border-white/30"
                                }`}
                        >
                            {feature}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

const budgetOptions = [
    "Menos de $500 USD",
    "$500 - $1,500 USD",
    "$1,500 - $5,000 USD",
    "Más de $5,000 USD",
    "Por definir",
];

function StepBudget({ formData, setFormData, montserrat }: StepProps) {
    return (
        <div>
            <h3
                className={`${montserrat.className} text-white text-xl font-semibold mb-5 leading-snug`}
            >
                ¿Cuál es tu presupuesto aproximado?
            </h3>
            <div className="flex flex-col gap-3">
                {budgetOptions.map((option) => {
                    const selected = formData.budget === option;
                    return (
                        <div
                            key={option}
                            onClick={() =>
                                setFormData((prev) => ({ ...prev, budget: option }))
                            }
                            className={`border rounded-xl p-4 cursor-pointer transition-all ${selected
                                    ? "border-[#2CFF68] bg-[#2CFF68]/10"
                                    : "border-white/10 hover:border-[#2CFF68]/50"
                                }`}
                        >
                            <p className={`${montserrat.className} text-white/80 text-sm`}>
                                {option}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

const timelineOptions = [
    { icon: <FcFlashOn />, label: "Urgente (menos de 1 mes)" },
    { icon: <FcPlanner />, label: "1 - 3 meses" },
    { icon: <FcCalendar />, label: "3 - 6 meses" },
    { icon: <FcAlarmClock />, label: "Sin fecha límite" },
];

function StepTimeline({ formData, setFormData, montserrat }: StepProps) {
    return (
        <div>
            <h3
                className={`${montserrat.className} text-white text-xl font-semibold mb-5 leading-snug`}
            >
                ¿En cuánto tiempo necesitas el proyecto?
            </h3>
            <div className="flex flex-col gap-3">
                {timelineOptions.map((option) => {
                    const selected = formData.timeline === option.label;
                    return (
                        <div
                            key={option.label}
                            onClick={() =>
                                setFormData((prev) => ({ ...prev, timeline: option.label }))
                            }
                            className={`border rounded-xl p-4 cursor-pointer transition-all flex items-center gap-3 ${selected
                                    ? "border-[#2CFF68] bg-[#2CFF68]/10"
                                    : "border-white/10 hover:border-[#2CFF68]/50"
                                }`}
                        >
                            <span className="text-xl [&>svg]:w-5 [&>svg]:h-5">
                                {option.icon}
                            </span>
                            <p className={`${montserrat.className} text-white/80 text-sm`}>
                                {option.label}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function StepDescription({ formData, setFormData, montserrat }: StepProps) {
    return (
        <div>
            <h3
                className={`${montserrat.className} text-white text-xl font-semibold mb-1 leading-snug`}
            >
                Cuéntame más sobre tu idea
            </h3>
            <p className={`${montserrat.className} text-white/40 text-xs mb-5`}>
                Entre más detalles, mejor puedo ayudarte
            </p>
            <textarea
                rows={5}
                placeholder="Describe tu proyecto, qué problema resuelve, quién lo usará, si tienes referencias visuales..."
                className={`${montserrat.className} w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm resize-none focus:outline-none focus:border-[#2CFF68]/50 transition-colors placeholder:text-white/30`}
                value={formData.description}
                onChange={(e) =>
                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                }
            />
        </div>
    );
}

function StepContact({ formData, setFormData, montserrat }: StepProps) {
    const inputClass = `${montserrat.className} w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#2CFF68]/50 transition-colors placeholder:text-white/30`;
    const labelClass = `${montserrat.className} block text-white/50 text-xs mb-1`;

    const emailTouched = formData.email.trim() !== "";
    const emailInvalid = emailTouched && !isValidEmail(formData.email);
    const emailInputClass = `${montserrat.className} w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors placeholder:text-white/30 ${emailInvalid
            ? "border-red-500/60 focus:border-red-500"
            : "border-white/10 focus:border-[#2CFF68]/50"
        }`;

    return (
        <div>
            <h3
                className={`${montserrat.className} text-white text-xl font-semibold mb-5 leading-snug`}
            >
                ¿Cómo me contacto contigo?
            </h3>
            <div className="flex flex-col gap-3">
                <div>
                    <label className={labelClass}>Nombre completo *</label>
                    <input
                        type="text"
                        required
                        placeholder="Tu nombre"
                        className={inputClass}
                        value={formData.name}
                        onChange={(e) =>
                            setFormData((prev) => ({ ...prev, name: e.target.value }))
                        }
                    />
                </div>
                <div>
                    <label className={labelClass}>Email *</label>
                    <input
                        type="email"
                        required
                        placeholder="tu@email.com"
                        autoComplete="email"
                        inputMode="email"
                        aria-invalid={emailInvalid}
                        className={emailInputClass}
                        value={formData.email}
                        onChange={(e) =>
                            setFormData((prev) => ({ ...prev, email: e.target.value }))
                        }
                    />
                    {emailInvalid && (
                        <p
                            className={`${montserrat.className} text-red-400/80 text-xs mt-1`}
                        >
                            Ingresa un email válido (ej. tu@email.com).
                        </p>
                    )}
                </div>
                <div>
                    <label className={labelClass}>Empresa (opcional)</label>
                    <input
                        type="text"
                        placeholder="Nombre de tu empresa"
                        className={inputClass}
                        value={formData.company}
                        onChange={(e) =>
                            setFormData((prev) => ({ ...prev, company: e.target.value }))
                        }
                    />
                </div>
                <div>
                    <label className={labelClass}>¿Cómo me encontraste? (opcional)</label>
                    <input
                        type="text"
                        placeholder="LinkedIn, recomendación, Google..."
                        className={inputClass}
                        value={formData.howFound}
                        onChange={(e) =>
                            setFormData((prev) => ({ ...prev, howFound: e.target.value }))
                        }
                    />
                </div>
            </div>
        </div>
    );
}
