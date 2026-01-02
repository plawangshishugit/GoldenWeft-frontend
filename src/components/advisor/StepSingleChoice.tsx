"use client";

import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

const CONFIG: Record<
  string,
  { question: string; options: string[] }
> = {
  occasion: {
    question: "What is this silk for?",
    options: [
      "Wedding",
      "Festival",
      "Everyday",
      "Gifting",
      "Special Event",
    ],
  },
  drape: {
    question: "How would you like the silk to feel?",
    options: [
      "Light & breathable",
      "Balanced & versatile",
      "Rich & structured",
    ],
  },
  style: {
    question: "Which style feels most like you?",
    options: [
      "Traditional",
      "Elegant",
      "Contemporary",
      "Bold",
    ],
  },
  tone: {
    question: "Which tones suit you best?",
    options: ["Warm", "Cool", "Neutral"],
  },
  investment: {
    question: "How would you like to invest?",
    options: [
      "Everyday luxury",
      "Occasion special",
      "Heirloom piece",
    ],
  },
};

export default function StepSingleChoice({
  step,
  onSelect,
  onBack,
}: {
  step: keyof typeof CONFIG;
  onSelect: (key: string, value: string) => void;
  onBack: () => void;
}) {
  const data = CONFIG[step];

  if (!data) return null;

  return (
    <Section>
      <div className="max-w-xl">
        <Text as="h2">{data.question}</Text>

        <div className="mt-8 grid gap-4">
          {data.options.map((opt) => (
            <button
              key={opt}
              onClick={() => onSelect(step, opt)}
              className="text-left p-4 border border-black/10 rounded-soft hover:border-black/30 transition"
            >
              {opt}
            </button>
          ))}
        </div>

        <button
          onClick={onBack}
          className="mt-8 text-sm underline opacity-70"
        >
          Back
        </button>
      </div>
    </Section>
  );
}
