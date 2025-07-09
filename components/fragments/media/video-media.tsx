"use client";

import { cn } from "~/utilities/ui";
import * as React from "react";

import type { Props as MediaProps } from "./index";

import { getMediaUrl } from "~/utilities/get-media-url";

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { onClick, resource, videoClassName } = props;

  const videoRef = React.useRef<HTMLVideoElement>(null);
  // const [showFallback] = useState<boolean>()

  React.useEffect(() => {
    const { current: video } = videoRef;
    if (video) {
      video.addEventListener("suspend", () => {
        // setShowFallback(true);
        // console.warn('Video was suspended, rendering fallback image.')
      });
    }
  }, []);

  if (resource && typeof resource === "object") {
    const { filename } = resource;

    return (
      <video
        autoPlay
        className={cn(videoClassName)}
        controls={false}
        loop
        muted
        onClick={onClick}
        playsInline
        ref={videoRef}
      >
        <source src={getMediaUrl(`/media/${filename}`)} />
      </video>
    );
  }

  return null;
};
