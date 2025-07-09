import { LocationTag } from "@/components/fragments/location-tag";
import { Media } from "@/components/fragments/media";
import { buttonVariants } from "@/components/ui/button";
import type {
  Community,
  FeaturedPropertiesBlock as FeaturedPropertiesBlockProps,
} from "@/payload-types";
import { draftMode } from "next/headers";
import Link from "next/link";
import { getPayload } from "payload";
import { cache } from "react";
import configPromise from "@payload-config";

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

export async function FeaturedPropertiesBlock({
  communityOne,
  communityTwo,
  communityThree,
}: FeaturedPropertiesBlockProps) {
  const one = await queryCommunityBySlug({
    slug: (communityOne as any).slug,
  });
  const two = await queryCommunityBySlug({
    slug: (communityTwo as any).slug,
  });
  const three = await queryCommunityBySlug({
    slug: (communityThree as any).slug,
  });

  return (
    <div className="container flex flex-col gap-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="font-display text-primary font-medium text-4xl sm:text-5xl">
          Representative Properties
        </h2>
        <Link
          className={buttonVariants({ variant: "default" })}
          href="/communities"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <CommunityItem doc={one} />
        <CommunityItem doc={two} />
        <CommunityItem doc={three} />
      </div>
    </div>
  );
}

function CommunityItem({ doc }: { doc: Community }) {
  return (
    <Link
      href={`/communities/${doc.slug}`}
      className="flex flex-col items-start gap-4"
    >
      <div className="relative w-full overflow-hidden aspect-16/9">
        <Media
          fill
          imgClassName="-z-10 object-cover size-full"
          pictureClassName="size-full"
          priority
          resource={doc.featuredImage}
        />
        <LocationTag
          className="absolute bottom-4 right-4 z-10 border-0"
          stateCode={doc.address.state}
          city={doc.address.city}
        />
      </div>
      <div className="w-full flex flex-col items-start justify-between gap-4">
        <h4 className="text-primary font-display leading-none text-2xl font-medium">
          {doc.name}
        </h4>
        <p className="line-clamp-5 text-xs text-primary leading-[2]">
          {doc.description}
        </p>
        <span className="text-xs font-medium uppercase text-secondary font-display">
          Learn More
        </span>
      </div>
    </Link>
  );
}
