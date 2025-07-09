import type { Metadata } from "next";

import configPromise from "@payload-config";
import { getPayload, type RequiredDataFromCollectionSlug } from "payload";
import { draftMode } from "next/headers";
import * as React from "react";

import { generateMeta } from "~/utilities/generate-meta";
import { LivePreviewListener } from "@/components/helpers/live-preview-listener";
import { PayloadRedirects } from "@/components/helpers/payload-redirects";
import { RenderHero } from "~/heros/render-hero";
import { RenderBlocks } from "~/blocks/render-blocks";
import { Communities } from "@/payload/blocks/communities/component";
import { TeamMembers } from "@/payload/blocks/team-members/component";

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const pages = await payload.find({
    collection: "pages",
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  });

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== "home";
    })
    .map(({ slug }) => {
      return { slug };
    });

  return params;
}

type Args = {
  params: Promise<{
    slug?: string;
  }>;
};

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode();
  const payload = await getPayload({ config: configPromise });

  const { slug = "home" } = await paramsPromise;
  const url = "/" + slug;

  let page: RequiredDataFromCollectionSlug<"pages"> | null;

  page = await queryPageBySlug({
    slug,
  });

  const communities = await payload.find({
    collection: "communities",
    depth: 1,
    overrideAccess: false,
  });

  if (!page) {
    console.log("No page found for slug:", slug);
    return <PayloadRedirects url={url} />;
  }

  const { hero, layout } = page;

  return (
    <article>
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
      {url === "/communities" && <Communities docs={communities.docs} />}
    </article>
  );
}

export async function generateMetadata({
  params: paramsPromise,
}: Args): Promise<Metadata> {
  const { slug = "home" } = await paramsPromise;
  const page = await queryPageBySlug({
    slug,
  });

  return generateMeta({ doc: page });
}

const queryPageBySlug = React.cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "pages",
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    depth: 3,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  const page = result.docs?.[0];

  // Manually populate the media if it's not populated
  if (page && page.hero && typeof page.hero.media === "number") {
    try {
      const mediaDoc = await payload.findByID({
        collection: "media",
        id: page.hero.media,
        overrideAccess: draft,
      });

      if (mediaDoc) {
        page.hero.media = mediaDoc;
      }
    } catch (error) {
      console.error("Error populating media:", error);
    }
  }

  return page || null;
});
