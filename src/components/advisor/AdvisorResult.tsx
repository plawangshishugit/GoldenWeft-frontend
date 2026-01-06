"use client";

import { useEffect, useState } from "react";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import AdvisorProductCard from "./AdvisorProductCard";

const CACHE_KEY = "gw_advisor_results_v1";

type AdvisorItem = {
  product?: any;
  reasons?: string[];
  confidence: number;
};

export default function AdvisorResult({
  answers,
  lastEdited,
  onRestart,
}: {
  answers: Record<string, string>;
  lastEdited: string | null;
  onRestart: () => void;
}) {
  const [results, setResults] = useState<AdvisorItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);

      try {
        const cachedRaw = localStorage.getItem(CACHE_KEY);
        const cached: AdvisorItem[] | null = cachedRaw
          ? JSON.parse(cachedRaw)
          : null;

        // 🔁 PARTIAL RE-RANK
        if (cached && lastEdited) {
          const value = answers[lastEdited];

          const reranked = cached
            .filter((r) => r && r.product) // ✅ HARD GUARD
            .map((r) => {
              let boost = 0;

              if (value) {
                if (
                  r.product?.tones?.includes(value) ||
                  r.product?.occasions?.includes(value) ||
                  r.product?.style === value ||
                  r.product?.tier === value
                ) {
                  boost = 5;
                }
              }

              return {
                ...r,
                confidence: Math.min(
                  100,
                  Math.max(0, r.confidence + boost)
                ),
              };
            })
            .sort((a, b) => b.confidence - a.confidence);

          if (mounted) {
            setResults(reranked);
            setLoading(false);
          }
          return;
        }

        // 🔁 FULL RECOMPUTE
        const res = await fetch("/api/advisor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers }),
        });

        const data = await res.json();
        const recs: AdvisorItem[] = (data.recommendations ?? []).filter(
          (r: AdvisorItem) => r && r.product
        ); // ✅ HARD GUARD

        if (mounted) {
          setResults(recs);
          localStorage.setItem(CACHE_KEY, JSON.stringify(recs));
          setLoading(false);
        }
      } catch (err) {
        console.error("AdvisorResult error:", err);
        if (mounted) {
          setResults([]);
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      mounted = false;
    };
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

        {lastEdited && (
          <div className="inline-block text-xs px-3 py-1 border rounded-full">
            Updated {lastEdited}
          </div>
        )}

        {results.length === 0 ? (
          <Text>No close matches found.</Text>
        ) : (
          <div className="space-y-8">
            {results.map((item, i) => {
              if (!item.product) return null; // ✅ FINAL SAFETY NET

              return (
                <AdvisorProductCard
                  key={`${item.product.slug}-${i}`}
                  product={item.product}
                  reasons={item.reasons ?? []}
                  confidence={item.confidence}
                  highlight={i === 0}
                />
              );
            })}
          </div>
        )}

        <div className="pt-10 border-t text-center">
          <button
            onClick={() => {
              localStorage.removeItem(CACHE_KEY);
              onRestart();
            }}
            className="underline opacity-70 hover:opacity-100"
          >
            Restart Find Your Silk
          </button>
        </div>
      </div>
    </Section>
  );
}
