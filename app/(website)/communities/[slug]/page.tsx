import { getPayload } from "payload";
import configPromise from "@payload-config";
import { draftMode } from "next/headers";
import { cache } from "react";
import { PayloadRedirects } from "@/components/helpers/payload-redirects";
import { LivePreviewListener } from "@/components/helpers/live-preview-listener";
import { StateCode, StateCodeKey } from "@/payload/custom-types";
import { LocationTag } from "@/components/fragments/location-tag";
import { StatsBlock } from "@/payload/blocks/stats/component";
import { CommunityFeaturesStats } from "@/components/sections/community-features-stats";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { CommunityMedia } from "@/components/sections/community-media";

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });

  const communities = await payload.find({
    collection: "communities",
    draft: false,
    select: {
      slug: true,
    },
  });

  const params = communities.docs.map(({ slug }) => {
    return { slug };
  });

  return params;
}

const queryCommunityBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "communities",
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return result.docs?.[0] || null;
});

type CommunityPageProps = {
  params: Promise<{ slug?: string }>;
};

export default async function CommunityPage({
  params: paramsPromise,
}: CommunityPageProps) {
  const { isEnabled: draft } = await draftMode();

  const { slug = "" } = await paramsPromise;
  const url = "/communities" + slug;

  const community = await queryCommunityBySlug({ slug });
  if (!community) return <PayloadRedirects url={url} />;

  return (
    <div className="flex flex-col">
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <div className="bg-primary container py-10">
        <h1 className="text-5xl font-display font-medium text-primary-foreground">
          {community.name}
        </h1>
      </div>
      <div className="container py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl text-primary font-display font-medium">
            {StateCode[community.address.state as StateCodeKey]}
          </h2>
          <h3 className="text-secondary font-display font-medium text-2xl">
            {community.name}
          </h3>
        </div>
        <LocationTag city={community.address.city} />
      </div>
      <CommunityMedia community={community} />
      <div className="flex flex-col sm:flex-row items-start gap-8 sm:gap-16 container py-16">
        <p className="leading-[2]">{community.description}</p>
        <div className="rounded-xl border p-4 sm:p-10 min-w-auto sm:min-w-md flex flex-col items-start gap-4">
          <div className="font-display font-medium text-4xl text-primary">
            Address
          </div>
          <div>{`${community.address.addressLine1}, ${community.address.city}, ${community.address.state} ${community.address.zip}`}</div>
          <Link
            className={buttonVariants({ variant: "default" })}
            href={community.websiteUrl}
          >
            Visit the Property's Website
          </Link>
        </div>
      </div>
      <CommunityFeaturesStats {...community} />
    </div>
  );
}
