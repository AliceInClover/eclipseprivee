import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Bounded } from "@/components/Bounded";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";

/**
 * Props for `UniverseGallery`.
 */
export type UniverseGalleryProps = SliceComponentProps<Content.UniverseGallerySlice>;

/**
 * Component for "UniverseGallery" Slices.
 */
const UniverseGallery: FC<UniverseGalleryProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-black py-16 text-white md:py-24"
    >
      <div className="mx-auto max-w-4xl space-y-12 text-center">
        <FadeIn className="translate-y-8 opacity-0" vars={{ duration: 1 }}>
          <RevealText
            field={slice.primary.heading}
            id={`universe-gallery-heading-${slice.id}`}
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
          {slice.items.map((item, index) => (
            <FadeIn
              key={index}
              className="translate-y-16 opacity-0"
              vars={{ duration: 1, delay: 0.6 + index * 0.1 }}
              start="top 80%"
            >
              <div className="group relative overflow-hidden rounded-lg">
                <PrismicNextImage
                  field={item.gallery_image}
                  className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  width={400}
                  height={320}
                />
                {item.image_caption && (
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="text-sm font-medium text-white">
                      {item.image_caption}
                    </p>
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default UniverseGallery;