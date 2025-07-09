import { Media } from "@/components/fragments/media";
import { Button } from "@/components/ui/button";
import { Page } from "@/payload-types";

export function BoxedHero({ media, heading }: Page["hero"]) {
  return (
    <div className="h-[80vh] relative w-full p-8 flex justify-start items-end">
      {media && (
        <Media
          fill
          className="absolute top-0 left-0 size-full"
          imgClassName="-z-10 object-cover size-full"
          pictureClassName="size-full"
          priority
          resource={media}
        />
      )}
      <div className="p-8 z-10 bg-white max-w-2xl space-y-4">
        <h1 className="font-display text-5xl leading-[1.3] text-primary font-medium">
          {heading}
        </h1>
      </div>
    </div>
  );
}
