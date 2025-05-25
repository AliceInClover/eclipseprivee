import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";

import { Bounded } from "@/components/Bounded";
import { RevealText } from "@/components/RevealText";
import { EventDisplay } from "./EventDisplay";
/**
 * Props for `EventList`.
 */
export type EventListProps = SliceComponentProps<Content.EventListSlice>;

/**
 * Component for "EventList" Slices.
 */
const EventList: FC<EventListProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="space-y-8 bg-black py-16 text-center text-white md:py-24"
    >
      <div className="mx-auto space-y-8">
        <p className="text-sm font-light tracking-[0.2em] uppercase">
          {slice.primary.eyebrow}
        </p>
        <RevealText
          field={slice.primary.heading}
          as="h2"
          id={`event-list-heading-${slice.id}`}
          align="center"
          duration={1.5}
          staggerAmount={0.3}
          className="font-display text-5xl uppercase sm:text-6xl md:text-7xl lg:text-8xl"
        />

        <div className="mx-auto max-w-2xl text-lg text-balance text-gray-300">
          <PrismicRichText field={slice.primary.body} />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12">
          {slice.primary.events.map((item) => {
            if (isFilled.contentRelationship(item.event)) {
              return (
                <EventDisplay
                  key={item.event.id}
                  id={item.event.id}
                />
              );
            }
          })}
        </div>
      </div>
    </Bounded>
  );
};

export default EventList;
