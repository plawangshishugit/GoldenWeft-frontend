"use client";

import { useEffect, useState } from "react";
import AdvisorProgress from "./AdvisorProgress";
import StepIntro from "./StepIntro";
import StepSingleChoice from "./StepSingleChoice";
import AdvisorResult from "./AdvisorResult";
import { AnimatePresence, motion } from "framer-motion";

/* ---------- Steps ---------- */
const steps = [
  "intro",
  "occasion",
  "drape",
  "style",
  "tone",
  "investment",
  "result",
] as const;

type StepKey = (typeof steps)[number];

/* ---------- Storage ---------- */
const STORAGE_KEY = "gw_advisor_state";

type StoredState = {
  step: number;
  answers: Record<string, string>;
};

export default function AdvisorLayout() {
  const [step, setStep] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [editTarget, setEditTarget] = useState<StepKey | null>(null);
  const [direction, setDirection] = useState(1); // ➡️ animation direction

  /* ---------- Restore ---------- */
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed: StoredState = JSON.parse(raw);
        setStep(parsed.step ?? 0);
        setAnswers(parsed.answers ?? {});
        return;
      } catch {}
    }
    setStep(0);
  }, []);

  /* ---------- Persist ---------- */
  useEffect(() => {
    if (step === null) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ step, answers })
    );
  }, [step, answers]);

  if (step === null) return null;

  const currentStep = steps[step];

  /* ---------- Navigation ---------- */
  const next = () => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const back = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const save = (key: string, value: string) => {
    setAnswers((prev) => {
      const updated = { ...prev, [key]: value };

      if (editTarget) {
        setDirection(1);
        setStep(steps.indexOf("result"));
        setEditTarget(null);
      } else {
        next();
      }

      return updated;
    });
  };

  /* ---------- Render ---------- */
  return (
    <div className="min-h-screen flex flex-col justify-center">
      {/* Progress shown only for question steps */}
      {currentStep !== "intro" && currentStep !== "result" && (
        <AdvisorProgress
          current={step}
          total={steps.length - 2}
        />
      )}

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentStep}
          custom={direction}
          initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
          transition={{ duration: 0.3 }}
        >
          {/* Intro */}
          {currentStep === "intro" && (
            <StepIntro
              onNext={() => {
                localStorage.removeItem(STORAGE_KEY);
                setAnswers({});
                setEditTarget(null);
                setDirection(1);
                setStep(1);
              }}
            />
          )}

          {/* Result */}
          {currentStep === "result" && (
            <AdvisorResult
              answers={answers}
              onEdit={(stepKey) => {
                setEditTarget(stepKey);
                setDirection(-1);
                setStep(steps.indexOf(stepKey));
              }}
            />
          )}

          {/* Questions */}
          {currentStep !== "intro" &&
            currentStep !== "result" && (
              <StepSingleChoice
                step={currentStep}
                onSelect={save}
                onBack={back}
                defaultValue={answers[currentStep]}
              />
            )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
