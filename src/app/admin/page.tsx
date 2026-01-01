import { prisma } from "@/lib/prisma";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { requireAdminAuth } from "./_components/AdminAuth";
import { DateRangeSelector } from "./_components/DateRangeSelector";
import { MetricsGrid } from "./_components/MetricsGrid";
import { PreferencesTable } from "./_components/PreferencesTable";
import { TopWishlisted } from "./_components/TopWishlisted";
import { ExportLinks } from "./_components/ExportLinks";

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  await requireAdminAuth();

  const { range = "7" } = await searchParams;
  const fromDate = new Date(
    range === "all"
      ? 0
      : Date.now() - (range === "30" ? 30 : 7) * 86400000
  );

  const [
    sessions,
    wishlists,
    inquiries,
    clicks,
    recentSessions,
    topWishlisted,
  ] = await Promise.all([
    prisma.advisorSession.count({ where: { createdAt: { gte: fromDate } } }),
    prisma.conversionEvent.count({ where: { type: "wishlist", createdAt: { gte: fromDate } } }),
    prisma.conversionEvent.count({ where: { type: "inquiry", createdAt: { gte: fromDate } } }),
    prisma.conversionEvent.count({ where: { type: "advisor_click", createdAt: { gte: fromDate } } }),
    prisma.advisorSession.findMany({ where: { createdAt: { gte: fromDate } } }),
    prisma.conversionEvent.groupBy({
      by: ["productId"],
      where: { type: "wishlist", createdAt: { gte: fromDate } },
      _count: { productId: true },
    }),
  ]);

  return (
    <Section>
      {/* Header */}

    <div className="flex justify-between items-center">
      <div className="flex items-center gap-6">
        <Text as="h1">GoldenWeft Admin Dashboard</Text>
      </div>
    <div>
      {/* ✅ Admin navigation */}
      <nav className="flex gap-4 text-sm">
        <button>
            <a
              href="/admin/orders"
              className="underline opacity-70 hover:opacity-100"
            >
              Orders
            </a>
        </button>
        <button>
          <a
            href="/api/admin/logout"
            className="text-sm underline opacity-70 hover:opacity-100"
            >
            Logout
            </a>
        </button>
      </nav>
    </div>
  </div>
      <DateRangeSelector current={range} />

      <MetricsGrid
        sessions={sessions}
        clicks={clicks}
        wishlists={wishlists}
        inquiries={inquiries}
      />

      <PreferencesTable
        stats={recentSessions.reduce((acc: any, s: any) => {
          for (const k in s.answers) {
            acc[k] ??= {};
            acc[k][s.answers[k]] = (acc[k][s.answers[k]] || 0) + 1;
          }
          return acc;
        }, {})}
      />

      <TopWishlisted items={topWishlisted} />

      <ExportLinks />
    </Section>
  );
}
