"use client";

import { LocationTag } from "@/components/fragments/location-tag";
import { Media } from "@/components/fragments/media";
import { cn } from "@/lib/utils";
import { Community } from "@/payload-types";
import Link from "next/link";
import React from "react";

export type CommunitiesProps = {
  className?: string;
  docs?: Community[];
};

export function Communities({ className, docs }: CommunitiesProps) {
  const [state, setState] = React.useState<"active" | "sold">("active");

  const activeCommunities = docs?.filter((doc) => doc.sold === false);
  const soldCommunities = docs?.filter((doc) => doc.sold === true);

  return (
    <div className={cn("container flex flex-col gap-12 pb-16", className)}>
      <div className="flex flex-col gap-4">
        <h3 className="font-display font-medium text-2xl text-primary">
          Sherman Assets
        </h3>
        <div className="w-fit flex border rounded-md p-2">
          <div
            className={cn(
              "px-6 py-2 cursor-pointer rounded-sm font-medium flex items-center justify-center",
              state === "active" &&
                "border-2 border-primary bg-muted text-primary"
            )}
            onClick={() => setState("active")}
          >
            Active
          </div>
          <div
            className={cn(
              "px-6 py-2 cursor-pointer rounded-sm font-medium flex items-center justify-center",
              state === "sold" &&
                "border-2 border-primary bg-muted text-primary"
            )}
            onClick={() => setState("sold")}
          >
            Recently Sold
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {state === "active" &&
          activeCommunities?.map((doc) => (
            <CommunityItem key={doc.id} doc={doc} />
          ))}
        {state === "sold" &&
          soldCommunities?.map((doc) => (
            <CommunityItem key={doc.id} doc={doc} />
          ))}
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
      <div className="w-full flex items-start justify-between gap-4">
        <div className="space-y-0.5">
          <h4 className="text-secondary font-display leading-none text-2xl font-medium">
            {doc.name}
          </h4>
          <span className="text-xs font-bold text-primary uppercase">
            Acquired {doc.yearAcquired}
          </span>
        </div>
        <div className="rounded-full text-xs px-2 py-1 font-bold bg-muted text-primary">
          Fund {doc.fund}
        </div>
      </div>
    </Link>
  );
}
