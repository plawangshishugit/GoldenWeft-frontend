// import Link from "next/link";
// import { Section } from "@/components/ui/Section";
// import { Text } from "@/components/ui/Text";

// export default function Footer() {
//   return (
//     <footer className="border-t border-black/10 mt-24">
//       <Section>
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
//           {/* Brand */}
//           <div>
//             <Text as="h3">GoldenWeft</Text>
//             <Text className="mt-4 text-sm opacity-80">
//               Handwoven Bhagalpuri silks crafted with patience, heritage, and
//               respect for tradition.
//             </Text>
//           </div>

//           {/* Explore */}
//           <div>
//             <Text as="h3">Explore</Text>
//             <ul className="mt-4 space-y-2 text-sm opacity-80">
//               <li><Link href="/collections">Collections</Link></li>
//               <li><Link href="/seasons">Seasons & Festivals</Link></li>
//               <li><Link href="/styles">Shop by Style</Link></li>
//               <li><Link href="/find-your-silk">Find Your Silk</Link></li>
//             </ul>
//           </div>

//           {/* About */}
//           <div>
//             <Text as="h3">About</Text>
//             <ul className="mt-4 space-y-2 text-sm opacity-80">
//               <li><Link href="/legacy">Our Legacy</Link></li>
//               <li><Link href="/sustainability">Sustainability</Link></li>
//               <li><Link href="/craft">Craft & Artisans</Link></li>
//             </ul>
//           </div>

//           {/* Business */}
//           <div>
//             <Text as="h3">Business</Text>
//             <ul className="mt-4 space-y-2 text-sm opacity-80">
//               <li><Link href="/exports">Exports & Bulk Orders</Link></li>
//               <li><Link href="/contact">Contact</Link></li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Line */}
//         <div className="mt-16 pt-6 border-t border-black/5 flex flex-col md:flex-row justify-between text-xs opacity-70">
//           <span>© {new Date().getFullYear()} GoldenWeft. All rights reserved.</span>
//           <span>Handwoven in Bhagalpur, India</span>
//         </div>
//       </Section>
//     </footer>
//   );
// }


import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 mt-24">
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Text as="h3">GoldenWeft</Text>
            <Text className="mt-4 text-sm opacity-80">
              Handwoven Bhagalpuri silks crafted with patience, heritage, and
              respect for tradition.
            </Text>
          </div>

          {/* Explore */}
          <div>
            <Text as="h3">Explore</Text>
            <ul className="mt-4 space-y-2 text-sm opacity-80">
              <li><Link href="/collections">Collections</Link></li>
              <li><Link href="/seasons">Seasons & Festivals</Link></li>
              <li><Link href="/styles">Shop by Style</Link></li>
              <li><Link href="/find-your-silk">Find Your Silk</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <Text as="h3">About</Text>
            <ul className="mt-4 space-y-2 text-sm opacity-80">
              <li><Link href="/legacy">Our Legacy</Link></li>
              <li><Link href="/about/sustainability">Sustainability</Link></li>
              <li><Link href="/about/craft-artisans">Craft & Artisans</Link></li>
            </ul>
          </div>

          {/* Business */}
          <div>
            <Text as="h3">Business</Text>
            <ul className="mt-4 space-y-2 text-sm opacity-80">
              <li><Link href="/exports">Exports & Bulk Orders</Link></li>
              <li><Link href="/business/contact">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-16 pt-6 border-t border-black/5 flex flex-col md:flex-row justify-between text-xs opacity-70">
          <span>© {new Date().getFullYear()} GoldenWeft. All rights reserved.</span>
          <span>Handwoven in Bhagalpur, India</span>
        </div>
      </Section>
    </footer>
  );
}
