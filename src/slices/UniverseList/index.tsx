import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";
import { UniverseCard } from "@/components/UniverseCard";
import { createClient } from "@/prismicio";

/**
 * Props for `UniverseList`.
 */
export type UniverseListProps = SliceComponentProps<Content.UniverseListSlice>;

/**
 * Component for "UniverseList" Slices.
 */
const UniverseList: FC<UniverseListProps> = async ({ slice }) => {
  const client = createClient();

  // Récupérer tous les univers ou ceux spécifiés dans le slice
  const universes = slice.items.length > 0
    ? await Promise.all(
        slice.items
          .filter((item) => isFilled.contentRelationship(item.universe))
          .map(async (item) => {
            return await client.getByID<Content.UniverseDocument>(item.universe.id);
          })
      )
    : await client.getAllByType("universe");

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-black py-16 text-white md:py-24"
    >
      <div className="mx-auto space-y-12 text-center">
        <FadeIn className="translate-y-8 opacity-0" vars={{ duration: 1 }}>
          <p className="mb-4 text-sm font-light tracking-[0.2em] uppercase text-neutral-400">
            {slice.primary.eyebrow}
          </p>

          <RevealText
            field={slice.primary.heading}
            id={`universe-list-heading-${slice.id}`}
            className="font-display text-4xl md:text-5xl lg:text-6xl"
            align="center"
            staggerAmount={0.1}
            duration={0.8}
          />
        </FadeIn>

        <FadeIn
          className="mx-auto max-w-2xl translate-y-8 text-lg text-neutral-300 opacity-0"
          vars={{ duration: 1, delay: 0.3 }}
        >
          <PrismicRichText field={slice.primary.description} />
        </FadeIn>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {universes.map((universe, index) => (
            <UniverseCard
              key={universe.id}
              universe={universe}
              index={index}
            />
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default UniverseList;