import { Content } from "@prismicio/client";
import { IconType } from "react-icons";
import {
  LuCrown,
  LuDroplet,
  LuFlame,
  LuGem,
  LuTreePine,
  LuZap,
} from "react-icons/lu";

type AttributeData = {
  label: string;
  Icon: IconType;
};

const EVENT_PROFILES: Record<
  Content.EventDocumentData["event_profile"],
  AttributeData
> = {
  spicy: { label: "Spicy & Smoky", Icon: LuFlame },
  woody: { label: "Woody & Herbal", Icon: LuTreePine },
  fresh: { label: "Fresh & Aquatic", Icon: LuDroplet },
};

const MOODS: Record<Content.EventDocumentData["mood"], AttributeData> = {
  bold: { label: "Bold & Seductive", Icon: LuCrown },
  grounded: { label: "Grounded & Sophisticated", Icon: LuGem },
  refreshing: { label: "Refreshing & Invigorating", Icon: LuZap },
};

type EventAttributesProps = {
  scentProfile: Content.EventDocumentData["event_profile"];
  mood: Content.EventDocumentData["mood"];
  className?: string;
};

export const EventAttributes = ({
  mood: providedMood,
  scentProfile: providedScentProfile,
  className,
}: EventAttributesProps) => {
  const scentProfile = EVENT_PROFILES[providedScentProfile];
  const mood = MOODS[providedMood];

  return (
    <div className={className}>
      <p className="mb-2 text-base font-semibold uppercase">Features</p>

      <div className="grid gap-2">
        <p className="flex items-center gap-2">
          <scentProfile.Icon className="size-6" />
          {scentProfile.label}
        </p>
        <p className="flex items-center gap-2">
          <mood.Icon className="size-6" />
          {mood.label}
        </p>
      </div>
    </div>
  );
};
