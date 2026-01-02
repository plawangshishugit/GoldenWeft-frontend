"use client";

import { useEffect, useState } from "react";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import AdvisorProductCard from "./AdvisorProductCard";

const CACHE_KEY = "gw_advisor_results_v1";

export default function AdvisorResult({
  answers,
  lastEdited,
  onRestart,
}: {
  answers: Record<string, string>;
  lastEdited: string | null;
  onRestart: () => void;
}) {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const cachedRaw = localStorage.getItem(CACHE_KEY);
      const cached = cachedRaw ? JSON.parse(cachedRaw) : null;

      if (cached && lastEdited) {
        // 🔁 PARTIAL RE-RANK using product metadata
        const reranked = cached
          .map((r: any) => {
            let boost = 0;

            const value = answers[lastEdited];

            if (!value) return r;

            if (
              r.product?.tones?.includes(value) ||
              r.product?.occasions?.includes(value) ||
              r.product?.style === value ||
              r.product?.tier === value
            ) {
              boost = 5;
            }

            return {
              ...r,
              confidence: Math.min(
                100,
                Math.max(0, r.confidence + boost)
              ),
            };
          })
          .sort((a: any, b: any) => b.confidence - a.confidence);

        setResults(reranked);
        setLoading(false);
        return;
      }

      // 🔁 Full recompute (first time or after reset)
      const res = await fetch("/api/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });

      const data = await res.json();
      const recs = data.recommendations ?? [];

      setResults(recs);
      localStorage.setItem(CACHE_KEY, JSON.stringify(recs));
      setLoading(false);
    }

    load();
  }, [answers, lastEdited]);

  if (loading) {
    return (
      <Section>
        <Text>Curating silks for you…</Text>
      </Section>
    );
  }

  return (
    <Section>
      <div className="max-w-4xl space-y-8">
        <Text as="h1">Your GoldenWeft Edit</Text>

        {/* 🔔 Change badge */}
        {lastEdited && (
          <div className="inline-block text-xs px-3 py-1 border rounded-full">
            Updated {lastEdited}
          </div>
        )}

        {/* Results */}
        {results.length === 0 ? (
          <Text>No close matches found.</Text>
        ) : (
          <div className="space-y-8">
            {results.map((item: any, i: number) => (
              <AdvisorProductCard
                key={item.product.id}
                product={item.product}
                reasons={item.reasons}
                confidence={item.confidence}
                highlight={i === 0}
              />
            ))}
          </div>
        )}

        {/* 🔽 Bottom control (simple & clean) */}
        <div className="pt-10 border-t text-center">
          <button
            onClick={onRestart}
            className="underline opacity-70 hover:opacity-100"
          >
            Restart Find Your Silk
          </button>
        </div>
      </div>
    </Section>
  );
}
