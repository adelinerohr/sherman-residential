import type { Metadata } from "next";

import type { Media, Page, Config } from "@/payload-types";

import { mergeOpenGraph } from "./merge-open-graph";
import { getServerSideURL } from "./get-url";

const getImageURL = (image?: Media | Config["db"]["defaultIDType"] | null) => {
  const serverUrl = getServerSideURL();

  let url = serverUrl + "/website-template-OG.webp";

  if (image && typeof image === "object" && "url" in image) {
    const ogUrl = image.sizes?.og?.url;

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url;
  }

  return url;
};

export const generateMeta = async (args: {
  doc: Partial<Page> | null;
}): Promise<Metadata> => {
  const { doc } = args;

  const ogImage = getImageURL(doc?.meta?.image);

  const title = doc?.meta?.title
    ? doc?.meta?.title + " | Payload Website Template"
    : "Payload Website Template";

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || "",
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join("/") : "/",
    }),
    title,
  };
};
