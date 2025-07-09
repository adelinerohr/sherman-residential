import * as React from "react";

import type { StaticImageData } from "next/image";
import type { ElementType, Ref } from "react";

import type { Media as MediaType } from "@/payload-types";
import { ImageMedia } from "./image-media";
import { VideoMedia } from "./video-media";

export interface Props {
  alt?: string;
  className?: string;
  fill?: boolean; // for NextImage only
  htmlElement?: ElementType | null;
  pictureClassName?: string;
  imgClassName?: string;
  onClick?: () => void;
  onLoad?: () => void;
  loading?: "lazy" | "eager"; // for NextImage only
  priority?: boolean; // for NextImage only
  ref?: Ref<HTMLImageElement | HTMLVideoElement | null>;
  resource?: MediaType | string | number | null; // for Payload media
  size?: string; // for NextImage only
  src?: StaticImageData; // for static media
  videoClassName?: string;
}

export function Media(props: Props) {
  const { className, htmlElement = "div", resource } = props;

  const isVideo =
    typeof resource === "object" && resource?.mimeType?.includes("video");
  const Tag = htmlElement || React.Fragment;

  return (
    <Tag
      {...(htmlElement !== null
        ? {
            className,
          }
        : {})}
    >
      {isVideo ? <VideoMedia {...props} /> : <ImageMedia {...props} />}
    </Tag>
  );
}
