"use client";

import { useEffect, useState } from "react";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import AdvisorProductCard from "./AdvisorProductCard";

export default function AdvisorResult({
  answers,
  onEdit,
}: {
  answers: Record<string, string>;
  onEdit: (step: "occasion" | "drape" | "style" | "tone" | "investment") => void;
}) {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<any[]>([]);
  const advisorSessionId =
    localStorage.getItem("advisorSessionId");


  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const res = await fetch("/api/advisor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            answers,
            advisorSessionId, // ✅ THIS IS THE KEY FIX
          }),

        });

        const data = await res.json();

        const safeResults = Array.isArray(data.recommendations)
          ? data.recommendations
          : Array.isArray(data.recommendations?.items)
          ? data.recommendations.items
          : [];

        setResults(safeResults);

        if (data.advisorSessionId) {
          localStorage.setItem(
            "advisorSessionId",
            data.advisorSessionId
          );
        }
      } catch (err) {
        console.error("Advisor fetch failed:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, [answers]);

  if (loading) {
    return (
      <Section>
        <Text>Curating silks for you…</Text>
      </Section>
    );
  }

  return (
    <Section>
      <div className="max-w-4xl items-center mx-auto">
        <div className="flex items-start justify-between items-center">
          <Text as="h1">Your GoldenWeft Edit</Text>
        </div>

        {results.length === 0 ? (
          <Text className="mt-6">
            No close matches found. Try adjusting preferences.
          </Text>
        ) : (
          <div className="mt-10 space-y-8">
            {results.map((item, index) => (
              <AdvisorProductCard
                key={item.product.id}
                product={item.product}
                reasons={item.reasons}
                confidence={item.confidence}
                highlight={index === 0}
              />
            ))}
          </div>
        )}
      </div>
{/* ---------- Refine Preferences ---------- */}
<div className="mt-20 pt-10 border-t border-black/10">
  <div className="flex flex-col items-center gap-4 text-center">
    <Text className="text-sm uppercase tracking-wider opacity-60">
      Refine your edit
    </Text>

    <div className="flex flex-wrap justify-center gap-3">
      {[
        { key: "occasion", label: "Occasion" },
        { key: "style", label: "Style" },
        { key: "tone", label: "Tone" },
        { key: "investment", label: "Investment" },
      ].map((item) => (
        <button
          key={item.key}
          onClick={() => onEdit(item.key as any)}
          className="
            px-5 py-2
            text-sm
            rounded-full
            border border-black/20
            hover:border-black
            hover:bg-black
            hover:text-white
            transition
          "
        >
          Edit {item.label}
        </button>
      ))}
    </div>
  </div>
</div>


    </Section>
  );
}
