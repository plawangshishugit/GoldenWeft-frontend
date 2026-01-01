import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

export default function ExportsPage() {
  return (
    <Section>
      <div className="max-w-4xl space-y-16">
        {/* Hero */}
        <div>
          <Text as="h1">Silk for Global Markets</Text>

          <Text className="mt-6 text-lg opacity-80">
            GoldenWeft works with international buyers, designers, and
            institutions seeking authentic Bhagalpuri silk — responsibly
            sourced and professionally delivered.
          </Text>
        </div>

        {/* Export Capability */}
        <div>
          <Text as="h2">Export Capabilities</Text>

          <Text className="mt-4 opacity-80">
            We support exports of Bhagalpuri silk fabrics and finished products
            across global markets. Our processes are designed to ensure
            consistency, quality assurance, and clear communication at every
            stage.
          </Text>

          <ul className="mt-4 list-disc list-inside opacity-80 space-y-2">
            <li>Bulk fabric supply</li>
            <li>Made-to-order manufacturing</li>
            <li>Private labeling (on request)</li>
            <li>Seasonal and long-term sourcing partnerships</li>
          </ul>
        </div>

        {/* Customization */}
        <div>
          <Text as="h2">Customization & Sampling</Text>

          <Text className="mt-4 opacity-80">
            We understand that global buyers often require specific
            specifications. Customization options are available based on
            quantity and lead time.
          </Text>

          <ul className="mt-4 list-disc list-inside opacity-80 space-y-2">
            <li>Fabric type and weave selection</li>
            <li>Color and tone customization</li>
            <li>Drape and weight preferences</li>
            <li>Sampling before bulk production</li>
          </ul>
        </div>

        {/* Quality & Compliance */}
        <div>
          <Text as="h2">Quality & Compliance</Text>

          <Text className="mt-4 opacity-80">
            Every shipment is quality-checked before dispatch. We work closely
            with artisan clusters and ensure ethical sourcing practices aligned
            with traditional handloom standards.
          </Text>

          <Text className="mt-4 opacity-80">
            Documentation, packaging, and compliance requirements are handled
            in coordination with buyers and logistics partners.
          </Text>
        </div>

        {/* Logistics */}
        <div>
          <Text as="h2">Logistics & Delivery</Text>

          <Text className="mt-4 opacity-80">
            We coordinate exports through trusted logistics partners to ensure
            timely and secure delivery.
          </Text>

          <ul className="mt-4 list-disc list-inside opacity-80 space-y-2">
            <li>Standard and expedited shipping options</li>
            <li>Export-grade packaging</li>
            <li>Tracking and documentation support</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <Text as="h2">Work With Us</Text>

          <Text className="mt-4 opacity-80">
            If you are a buyer, brand, or institution interested in sourcing
            Bhagalpuri silk, we invite you to connect with us for detailed
            discussions on requirements, timelines, and feasibility.
          </Text>

          <Text className="mt-4 opacity-80">
            Our team is available to guide you through sampling, pricing, and
            export logistics.
          </Text>
        </div>
      </div>
    </Section>
  );
}
