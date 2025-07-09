import { Community } from "@/payload-types";
import { Media } from "../fragments/media";

type CommunityMediaProps = {
  community: Community;
};

export function CommunityMedia({ community }: CommunityMediaProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr] gap-2 sm:gap-4 min-h-auto">
      {/* Large featured image on the left */}
      <div className="relative aspect-3/2 sm:aspect-auto">
        <Media
          fill
          imgClassName="object-cover"
          pictureClassName=""
          resource={community.featuredImage}
        />
      </div>

      {/* Grid of smaller images on the right */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        {community.images.slice(0, 8).map((image, index) => {
          return (
            <div key={index} className="relative aspect-3/2">
              <Media
                fill
                imgClassName="object-cover"
                pictureClassName=""
                resource={image}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
