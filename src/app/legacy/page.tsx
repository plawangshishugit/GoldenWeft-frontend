import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

export default function LegacyPage() {
  return (
    <Section>
      <div className="max-w-4xl space-y-16">
        {/* Hero */}
        <div>
          <Text as="h1">The Legacy of Bhagalpuri Silk</Text>

          <Text className="mt-6 text-lg opacity-80">
            For centuries, Bhagalpur has been the heart of India’s silk
            craftsmanship — where fabric is not manufactured, but woven with
            patience, skill, and human touch.
          </Text>
        </div>

        {/* Origin */}
        <div>
          <Text as="h2">A Craft Older Than Time</Text>

          <Text className="mt-4 opacity-80">
            Known as the “Silk City of India,” Bhagalpur’s weaving tradition
            dates back hundreds of years. Families pass down looms, techniques,
            and sensibilities across generations — preserving a heritage that
            cannot be replicated by machines.
          </Text>
        </div>

        {/* Human Touch */}
        <div>
          <Text as="h2">Woven by Hands, Not Machines</Text>

          <Text className="mt-4 opacity-80">
            Every Bhagalpuri silk carries subtle variations — in texture,
            weave, and finish. These are not flaws. They are signatures of the
            artisan who wove it.
          </Text>

          <Text className="mt-4 opacity-80">
            Unlike factory-produced fabrics, handwoven silk responds to the
            weaver’s rhythm, the climate, and the yarn itself — making every
            piece truly one of a kind.
          </Text>
        </div>

        {/* Materials */}
        <div>
          <Text as="h2">Natural Fibres, Honest Materials</Text>

          <Text className="mt-4 opacity-80">
            Bhagalpuri silk is traditionally woven using natural fibres such as
            Tussar, Mulberry, and Ghicha. These silks are prized for their
            breathability, raw elegance, and graceful aging over time.
          </Text>
        </div>

        {/* Philosophy */}
        <div>
          <Text as="h2">Our Philosophy at GoldenWeft</Text>

          <Text className="mt-4 opacity-80">
            At GoldenWeft, we do not chase trends blindly. We curate silks that
            respect tradition while fitting modern lives — whether for
            ceremonies, celebrations, or quiet everyday elegance.
          </Text>

          <Text className="mt-4 opacity-80">
            We believe luxury is not about perfection, but about authenticity,
            intention, and longevity.
          </Text>
        </div>

        {/* Closing */}
        <div>
          <Text as="h2">A Living Legacy</Text>

          <Text className="mt-4 opacity-80">
            When you choose Bhagalpuri silk, you are not just selecting a
            fabric. You are supporting an ecosystem of artisans, preserving a
            cultural heritage, and carrying forward a story that deserves to
            endure.
          </Text>
        </div>
      </div>
    </Section>
  );
}
