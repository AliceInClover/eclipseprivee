import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Bounded } from "@/components/Bounded";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";
import { ButtonLink } from "@/components/ButtonLink";

/**
 * Props for `UniverseHero`.
 */
export type UniverseHeroProps = SliceComponentProps<Content.UniverseHeroSlice>;

/**
 * Component for "UniverseHero" Slices.
 */
const UniverseHero: FC<UniverseHeroProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative min-h-screen overflow-hidden bg-neutral-950"
    >
      <FadeIn
        vars={{ scale: 1, opacity: 0.6 }}
        className="absolute inset-0 opacity-0 motion-safe:scale-105"
      >
        <PrismicNextImage
          field={slice.primary.background_image}
          alt=""
          priority
          fill
          className="object-cover motion-reduce:opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </FadeIn>

      <div className="relative flex h-screen flex-col justify-center items-center text-center">
        <FadeIn
          className="mb-4 translate-y-8 text-sm font-light tracking-[0.3em] uppercase text-neutral-300"
          vars={{ delay: 0.5, duration: 1 }}
        >
          {slice.primary.subtitle}
        </FadeIn>

        <RevealText
          field={slice.primary.heading}
          id="universe-hero-heading"
          className="font-display max-w-4xl text-6xl leading-none text-neutral-50 md:text-7xl lg:text-8xl"
          staggerAmount={0.15}
          duration={1.5}
          as="h1"
          align="center"
        />

        <FadeIn
          className="mt-8 max-w-2xl translate-y-8 text-lg text-neutral-200 text-balance"
          vars={{ delay: 1.2, duration: 1.3 }}
        >
          <PrismicRichText field={slice.primary.description} />
        </FadeIn>

        <FadeIn
          className="mt-12 translate-y-5"
          vars={{ delay: 1.8, duration: 1.1 }}
        >
          <ButtonLink
            field={slice.primary.cta_button}
            className="w-fit"
            variant="Secondary"
          />
        </FadeIn>
      </div>
    </Bounded>
  );
};

export default UniverseHero;