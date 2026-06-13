"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { FiX, FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { MdMailOutline } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
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
import { useT } from "@/lib/i18n/context";
import type { Dictionary } from "@/lib/i18n/types";

type WizardDict = Dictionary["wizard"];

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
  contact: string;
  description: string;
  name: string;
  email: string;
  company: string;
  howFound: string;
};

const initialFormData: FormData = {
  projectType: "",
  features: [],
  contact: "Email",
  budget: "",
  timeline: "",
  description: "",
  name: "",
  email: "",
  company: "",
  howFound: "",
};

const totalSteps = 6;

const WHATSAPP_NUMBER = "523349819028";

const buildWhatsappMessage = (formData: FormData, w: WizardDict["whatsapp"]) => {
  const lines = [
    w.greeting.replace("{name}", formData.name.trim()),
    "",
    `*${w.projectType}:* ${formData.projectType}`,
    `*${w.features}:* ${formData.features.join(", ")}`,
    `*${w.budget}:* ${formData.budget}`,
    `*${w.timeline}:* ${formData.timeline}`,
    "",
    `*${w.description}:* ${formData.description.trim()}`,
  ];
  if (formData.company.trim()) lines.push(`*${w.company}:* ${formData.company.trim()}`);
  if (formData.howFound.trim())
    lines.push(`*${w.howFound}:* ${formData.howFound.trim()}`);
  return lines.join("\n");
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const isValidEmail = (email: string) => emailRegex.test(email.trim());
const subscribeToClientMount = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

type StepProps = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  montserrat: { className: string };
  specialGothic?: { className: string };
  t: WizardDict;
};

const getStepVariants = (shouldReduceMotion: boolean) => ({
  enter: (dir: number) => ({
    x: shouldReduceMotion ? "0%" : dir > 0 ? "60%" : "-60%",
    opacity: shouldReduceMotion ? 1 : 0,
  }),
  center: { x: "0%", opacity: 1 },
  exit: (dir: number) => ({
    x: shouldReduceMotion ? "0%" : dir > 0 ? "-60%" : "60%",
    opacity: shouldReduceMotion ? 1 : 0,
  }),
});

export default function ProjectWizard() {
  const t = useT();
  const w = t.wizard;
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showHint, setShowHint] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const mounted = useSyncExternalStore(
    subscribeToClientMount,
    getClientSnapshot,
    getServerSnapshot,
  );
  const shouldReduceMotion = useReducedMotion();
  const stepVariants = getStepVariants(Boolean(shouldReduceMotion));
  const overlayTransition = shouldReduceMotion ? { duration: 0 } : undefined;
  const sheetTransition = shouldReduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 300, damping: 25 };
  const stepTransition = {
    duration: shouldReduceMotion ? 0 : 0.3,
    ease: "easeInOut" as const,
  };
  const progressTransition = {
    duration: shouldReduceMotion ? 0 : 0.4,
    ease: "easeInOut" as const,
  };

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
        if (formData.contact === "Whatsapp") return formData.name.trim() !== "";
        return formData.name.trim() !== "" && isValidEmail(formData.email);
      default:
        return true;
    }
  };

  const hintMessage = () => {
    if (currentStep === 5) {
      if (formData.contact === "Whatsapp") {
        return w.hints.name;
      }
      if (formData.name.trim() === "") return w.hints.nameEmail;
      if (formData.email.trim() === "") return w.hints.email;
      if (!isValidEmail(formData.email)) return w.hints.validEmail;
      return w.hints.nameEmail;
    }
    if (currentStep === 4) return w.hints.describe;
    return w.hints.selectOne;
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

      toast.success(w.toast.successTitle, {
        description: w.toast.successDesc,
        duration: 5000,
      });

      closeWizard();
    } catch {
      toast.error(w.toast.errorTitle, {
        description: w.toast.errorDesc,
        duration: 4000,
      });
    } finally {
      setIsSending(false);
    }
  };
  const handleWhatsapp = () => {
    if (!isStepValid()) {
      setShowHint(true);
      setTimeout(() => setShowHint(false), 2500);
      return;
    }
    const message = encodeURIComponent(
      buildWhatsappMessage(formData, w.whatsapp),
    );
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
      "_blank",
      "noopener,noreferrer",
    );
    closeWizard();
  };

  const goBack = () => {
    setShowHint(false);
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
  }, [isOpen]);

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
        label={w.trigger}
        type="iconWithText"
        size="small"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
      />

      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="fixed inset-0 z-200 flex h-dvh items-end justify-center overflow-hidden bg-black/80 backdrop-blur-sm sm:items-center sm:px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={overlayTransition}
                onClick={closeWizard}
              >
                <motion.div
                  className="flex h-dvh w-full flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-[#0a0a0a] sm:h-auto sm:max-h-[90dvh] sm:max-w-lg sm:rounded-3xl"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={sheetTransition}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="shrink-0">
                    <div className="flex items-center justify-between px-6 pt-6">
                      <div>
                        <p
                          className={`${montserrat.className} text-white/40 text-[0.8rem] tracking-widest uppercase`}
                        >
                          {w.eyebrow}
                        </p>
                        <p
                          className={`${montserrat.className} mt-1 text-[0.8rem] text-white/20`}
                        >
                          {w.step} {currentStep + 1} {w.stepOf} {totalSteps}
                        </p>
                      </div>
                      <button
                        onClick={closeWizard}
                        className="min-h-11 min-w-11 text-white/40 transition-colors hover:text-white"
                        aria-label={w.close}
                      >
                        <FiX size={18} className="mx-auto" />
                      </button>
                    </div>

                    <div className="mx-6 mt-4 h-0.5 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-[#2CFF68]"
                        animate={{
                          width: `${((currentStep + 1) / totalSteps) * 100}%`,
                        }}
                        transition={progressTransition}
                      />
                    </div>
                  </div>

                  <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6">
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.div
                        key={currentStep}
                        custom={direction}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={stepTransition}
                      >
                        {currentStep === 0 && (
                          <StepProjectType
                            formData={formData}
                            setFormData={setFormData}
                            montserrat={montserrat}
                            specialGothic={specialGothicExpandedOne}
                            t={w}
                          />
                        )}
                        {currentStep === 1 && (
                          <StepFeatures
                            formData={formData}
                            setFormData={setFormData}
                            montserrat={montserrat}
                            t={w}
                          />
                        )}
                        {currentStep === 2 && (
                          <StepBudget
                            formData={formData}
                            setFormData={setFormData}
                            montserrat={montserrat}
                            t={w}
                          />
                        )}
                        {currentStep === 3 && (
                          <StepTimeline
                            formData={formData}
                            setFormData={setFormData}
                            montserrat={montserrat}
                            t={w}
                          />
                        )}
                        {currentStep === 4 && (
                          <StepDescription
                            formData={formData}
                            setFormData={setFormData}
                            montserrat={montserrat}
                            t={w}
                          />
                        )}
                        {currentStep === 5 && (
                          <StepContact
                            formData={formData}
                            setFormData={setFormData}
                            montserrat={montserrat}
                            t={w}
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="shrink-0 border-t border-white/5 bg-[#0a0a0a]">
                    <AnimatePresence>
                      {showHint && (
                        <motion.p
                          initial={{
                            opacity: 0,
                            y: shouldReduceMotion ? 0 : -4,
                          }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={stepTransition}
                          className={`${montserrat.className} px-6 pb-2 pt-3 text-center text-[0.8rem] text-[#2CFF68]/70`}
                        >
                          {hintMessage()}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <div className="flex items-center justify-between px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4">
                      <button
                        onClick={goBack}
                        disabled={currentStep === 0}
                        className={`${montserrat.className} flex min-h-11 items-center gap-1 rounded-full px-2 py-3 text-sm transition-colors ${
                          currentStep === 0
                            ? "pointer-events-none text-white/20"
                            : "text-white/50 hover:text-white"
                        }`}
                      >
                        <FiChevronLeft size={16} /> {w.back}
                      </button>
                      <button
                        onClick={
                          currentStep === totalSteps - 1
                            ? formData.contact === "Whatsapp"
                              ? handleWhatsapp
                              : handleSubmit
                            : goNext
                        }
                        disabled={!isStepValid() || isSending}
                        className={`${montserrat.className} flex min-h-11 items-center gap-1 rounded-full px-6 py-3 text-sm font-bold transition-all duration-200 ${
                          isStepValid() && !isSending
                            ? "cursor-pointer bg-[#2CFF68] text-black hover:bg-[#A3FFC0]"
                            : "cursor-not-allowed bg-white/10 text-white/30"
                        }`}
                      >
                        {currentStep === totalSteps - 1
                          ? formData.contact === "Whatsapp"
                            ? w.openWhatsapp
                            : isSending
                              ? w.sending
                              : w.send
                          : w.continue}
                        <FiChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

const projectTypeIcons = [
  <FcGlobe key="globe" />,
  <FcEngineering key="engineering" />,
  <FcCellPhone key="cellphone" />,
  <FcShop key="shop" />,
  <FcDecision key="decision" />,
];

function StepProjectType({
  formData,
  setFormData,
  montserrat,
  specialGothic,
  t,
}: StepProps) {
  return (
    <div>
      <h3
        className={`${specialGothic?.className ?? ""} text-white text-xl mb-5 leading-snug`}
      >
        {t.steps.projectType.title}
      </h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {t.steps.projectType.options.map((label, i) => {
          const selected = formData.projectType === label;
          return (
            <button
              type="button"
              key={label}
              onClick={() =>
                setFormData((prev) => ({ ...prev, projectType: label }))
              }
              aria-pressed={selected}
              className={`w-full cursor-pointer rounded-xl border p-4 text-left transition-all ${
                selected
                  ? "border-[#2CFF68] bg-[#2CFF68]/10"
                  : "border-white/10 hover:border-[#2CFF68]/50"
              }`}
            >
              <div className="text-2xl mb-2 [&>svg]:w-6 [&>svg]:h-6">
                {projectTypeIcons[i]}
              </div>
              <p
                className={`${montserrat.className} text-white/80 text-sm leading-snug`}
              >
                {label}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepFeatures({ formData, setFormData, montserrat, t }: StepProps) {
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
        {t.steps.features.title}
      </h3>
      <p className={`${montserrat.className} text-white/40 text-xs mb-5`}>
        {t.steps.features.subtitle}
      </p>
      <div className="flex flex-wrap gap-2">
        {t.steps.features.options.map((feature) => {
          const selected = formData.features.includes(feature);
          return (
            <button
              type="button"
              key={feature}
              onClick={() => toggleFeature(feature)}
              aria-pressed={selected}
              className={`${montserrat.className} cursor-pointer rounded-full border px-4 py-2 text-sm transition-all ${
                selected
                  ? "border-[#2CFF68] bg-[#2CFF68]/10 text-[#2CFF68]"
                  : "border-white/10 text-white/60 hover:border-white/30"
              }`}
            >
              {feature}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepBudget({ formData, setFormData, montserrat, t }: StepProps) {
  return (
    <div>
      <h3
        className={`${montserrat.className} text-white text-xl font-semibold mb-5 leading-snug`}
      >
        {t.steps.budget.title}
      </h3>
      <div className="flex flex-col gap-3">
        {t.steps.budget.options.map((option) => {
          const selected = formData.budget === option;
          return (
            <button
              type="button"
              key={option}
              onClick={() =>
                setFormData((prev) => ({ ...prev, budget: option }))
              }
              aria-pressed={selected}
              className={`w-full cursor-pointer rounded-xl border p-4 text-left transition-all ${
                selected
                  ? "border-[#2CFF68] bg-[#2CFF68]/10"
                  : "border-white/10 hover:border-[#2CFF68]/50"
              }`}
            >
              <p className={`${montserrat.className} text-white/80 text-sm`}>
                {option}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const timelineIcons = [
  <FcFlashOn key="flash" />,
  <FcPlanner key="planner" />,
  <FcCalendar key="calendar" />,
  <FcAlarmClock key="alarm" />,
];

function StepTimeline({ formData, setFormData, montserrat, t }: StepProps) {
  return (
    <div>
      <h3
        className={`${montserrat.className} text-white text-xl font-semibold mb-5 leading-snug`}
      >
        {t.steps.timeline.title}
      </h3>
      <div></div>
      <div className="flex flex-col gap-3">
        {t.steps.timeline.options.map((label, i) => {
          const selected = formData.timeline === label;
          return (
            <button
              type="button"
              key={label}
              onClick={() =>
                setFormData((prev) => ({ ...prev, timeline: label }))
              }
              aria-pressed={selected}
              className={`flex w-full cursor-pointer items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                selected
                  ? "border-[#2CFF68] bg-[#2CFF68]/10"
                  : "border-white/10 hover:border-[#2CFF68]/50"
              }`}
            >
              <span className="text-xl [&>svg]:w-5 [&>svg]:h-5">
                {timelineIcons[i]}
              </span>
              <p className={`${montserrat.className} text-white/80 text-sm`}>
                {label}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepDescription({ formData, setFormData, montserrat, t }: StepProps) {
  return (
    <div>
      <h3
        className={`${montserrat.className} text-white text-xl font-semibold mb-1 leading-snug`}
      >
        {t.steps.description.title}
      </h3>
      <p className={`${montserrat.className} text-white/40 text-xs mb-5`}>
        {t.steps.description.subtitle}
      </p>
      <textarea
        rows={5}
        placeholder={t.steps.description.placeholder}
        className={`${montserrat.className} w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm resize-none focus:outline-none focus:border-[#2CFF68]/50 transition-colors placeholder:text-white/30`}
        value={formData.description}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, description: e.target.value }))
        }
      />
    </div>
  );
}

const contactOptions = [
  {
    icon: <FaWhatsapp />,
    label: "Whatsapp",
  },
  {
    icon: <MdMailOutline />,
    label: "Email",
  },
];

function StepContact({ formData, setFormData, montserrat, t }: StepProps) {
  const inputClass = `${montserrat.className} w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#2CFF68]/50 transition-colors placeholder:text-white/30`;
  const labelClass = `${montserrat.className} block text-white/50 text-xs mb-1`;

  const emailTouched = formData.email.trim() !== "";
  const emailInvalid = emailTouched && !isValidEmail(formData.email);
  const emailInputClass = `${montserrat.className} w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors placeholder:text-white/30 ${
    emailInvalid
      ? "border-red-500/60 focus:border-red-500"
      : "border-white/10 focus:border-[#2CFF68]/50"
  }`;

  return (
    <div>
      <h3
        className={`${montserrat.className} text-white text-xl font-semibold mb-5 leading-snug`}
      >
        {t.steps.contact.title}
      </h3>
      <div className="flex flex-row gap-3">
        {contactOptions.map((option) => {
          const selected = formData.contact === option.label;
          return (
            <button
              type="button"
              key={option.label}
              onClick={() =>
                setFormData((prev) => ({ ...prev, contact: option.label }))
              }
              aria-pressed={selected}
              className={`flex w-full cursor-pointer items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                selected
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
            </button>
          );
        })}
      </div>
      <div className="mt-5 flex flex-col gap-3">
        <div>
          <label className={labelClass}>{t.steps.contact.nameLabel}</label>
          <input
            type="text"
            required
            placeholder={t.steps.contact.namePlaceholder}
            className={inputClass}
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        {formData.contact === "Email" && (
          <div>
            <label className={labelClass}>{t.steps.contact.emailLabel}</label>
            <input
              type="email"
              required
              placeholder={t.steps.contact.emailPlaceholder}
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
                {t.steps.contact.emailInvalid}
              </p>
            )}
          </div>
        )}
        <div>
          <label className={labelClass}>{t.steps.contact.companyLabel}</label>
          <input
            type="text"
            placeholder={t.steps.contact.companyPlaceholder}
            className={inputClass}
            value={formData.company}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, company: e.target.value }))
            }
          />
        </div>
        <div>
          <label className={labelClass}>{t.steps.contact.howFoundLabel}</label>
          <input
            type="text"
            placeholder={t.steps.contact.howFoundPlaceholder}
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
