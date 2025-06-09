import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Bounded } from "@/components/Bounded";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";
import { TransitionLink } from "@/components/TransitionLink";
import { createClient } from "@/prismicio";
import { formatPrice } from "@/utils/formatters";

/**
 * Props for `UniverseEvents`.
 */
export type UniverseEventsProps = SliceComponentProps<Content.UniverseEventsSlice>;

/**
 * Component for "UniverseEvents" Slices.
 */
const UniverseEvents: FC<UniverseEventsProps> = async ({ slice }) => {
  const client = createClient();

  // Récupérer les événements liés
  const events = await Promise.all(
    slice.items
      .filter((item) => isFilled.contentRelationship(item.event))
      .map(async (item) => {
        return await client.getByID<Content.EventDocument>(item.event.id);
      })
  );

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-neutral-900 py-16 text-white md:py-24"
    >
      <div className="mx-auto space-y-12 text-center">
        <FadeIn className="translate-y-8 opacity-0" vars={{ duration: 1 }}>
          <p className="mb-4 text-sm font-light tracking-[0.2em] uppercase text-neutral-400">
            {slice.primary.eyebrow}
          </p>

          <RevealText
            field={slice.primary.heading}
            id={`universe-events-heading-${slice.id}`}
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
          {events.map((event, index) => (
            <FadeIn
              key={event.id}
              className="translate-y-16 opacity-0"
              vars={{ duration: 1, delay: 0.6 + index * 0.1 }}
              start="top 80%"
            >
              <TransitionLink document={event} className="group block">
                <div className="relative overflow-hidden rounded-lg bg-neutral-800">
                  <div className="aspect-square">
                    <PrismicNextImage
                      field={event.data.bottle_image}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      width={400}
                      height={400}
                    />
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-display text-2xl">
                      <PrismicText field={event.data.title} />
                    </h3>
                    <p className="text-sm text-neutral-400">Eclipsed</p>
                    <p className="text-lg font-light">
                      {formatPrice(event.data.price)}
                    </p>
                  </div>
                </div>
              </TransitionLink>
            </FadeIn>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default UniverseEvents;