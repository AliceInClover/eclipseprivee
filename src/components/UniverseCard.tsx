import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import { TransitionLink } from "./TransitionLink";
import { FadeIn } from "./FadeIn";

type UniverseCardProps = {
  universe: Content.UniverseDocument;
  index?: number;
};

const UNIVERSE_THEMES = {
  mystique: {
    gradient: "from-purple-900/80 to-indigo-900/80",
    accent: "text-purple-300",
  },
  elegance: {
    gradient: "from-amber-900/80 to-yellow-900/80",
    accent: "text-amber-300",
  },
  aventure: {
    gradient: "from-emerald-900/80 to-teal-900/80",
    accent: "text-emerald-300",
  },
  serenite: {
    gradient: "from-blue-900/80 to-cyan-900/80",
    accent: "text-blue-300",
  },
};

export const UniverseCard = ({ universe, index = 0 }: UniverseCardProps) => {
  const theme = UNIVERSE_THEMES[universe.data.universe_type] || UNIVERSE_THEMES.mystique;

  return (
    <FadeIn
      className="translate-y-16 opacity-0"
      vars={{ duration: 1, delay: index * 0.2 }}
      start="top 80%"
    >
      <TransitionLink document={universe} className="group block">
        <div className="relative overflow-hidden rounded-lg bg-neutral-900 transition-transform duration-500 group-hover:scale-105">
          <div className="aspect-[4/5] relative">
            <PrismicNextImage
              field={universe.data.hero_image}
              className="h-full w-full object-cover"
              width={400}
              height={500}
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${theme.gradient} to-transparent`} />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <p className={`mb-2 text-sm font-light tracking-wider uppercase ${theme.accent}`}>
              {universe.data.subtitle}
            </p>
            <h3 className="font-display text-3xl leading-tight">
              <PrismicText field={universe.data.title} />
            </h3>
          </div>
        </div>
      </TransitionLink>
    </FadeIn>
  );
};