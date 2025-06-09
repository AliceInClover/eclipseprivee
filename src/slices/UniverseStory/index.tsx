import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Bounded } from "@/components/Bounded";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";
import clsx from "clsx";

/**
 * Props for `UniverseStory`.
 */
export type UniverseStoryProps = SliceComponentProps<Content.UniverseStorySlice>;

/**
 * Component for "UniverseStory" Slices.
 */
const UniverseStory: FC<UniverseStoryProps> = ({ slice }) => {
  const isImageLeft = slice.primary.layout === "image-left";

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-neutral-900 py-16 text-white md:py-24"
    >
      <div className={clsx(
        "grid grid-cols-1 items-center gap-12 lg:grid-cols-2",
        isImageLeft ? "lg:grid-flow-col" : ""
      )}>
        <FadeIn
          className={clsx(
            "translate-y-16 opacity-0",
            isImageLeft ? "lg:order-1" : "lg:order-2"
          )}
          vars={{ duration: 1.2 }}
          start="top 70%"
        >
          <PrismicNextImage
            field={slice.primary.story_image}
            className="h-auto w-full rounded-lg object-cover"
            width={600}
            height={400}
          />
        </FadeIn>

        <FadeIn
          className={clsx(
            "translate-y-16 space-y-6 opacity-0",
            isImageLeft ? "lg:order-2" : "lg:order-1"
          )}
          vars={{ duration: 1.2, delay: 0.3 }}
          start="top 70%"
        >
          <div className="space-y-4">
            <p className="text-sm font-light tracking-[0.2em] uppercase text-neutral-400">
              {slice.primary.eyebrow}
            </p>

            <RevealText
              field={slice.primary.heading}
              id={`universe-story-heading-${slice.id}`}
              className="font-display text-4xl md:text-5xl"
              staggerAmount={0.1}
              duration={0.8}
            />
          </div>

          <div className="max-w-2xl text-lg leading-relaxed text-neutral-300">
            <PrismicRichText field={slice.primary.story_content} />
          </div>
        </FadeIn>
      </div>
    </Bounded>
  );
};

export default UniverseStory;