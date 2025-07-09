import { Media } from "@/components/fragments/media";
import { Button } from "@/components/ui/button";
import { Page } from "@/payload-types";

export function FullScreenHero({ media, heading }: Page["hero"]) {
  return (
    <div className="h-[90vh] relative w-full p-6 sm:p-8 flex justify-start items-end">
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
      <div className="p-4 sm:p-8 bg-white max-w-2xl space-y-4">
        <h1 className="text-xl sm:text-[1.75rem] leading-[1.3] text-primary font-medium">
          {heading}
        </h1>
        <Button>Contact Us</Button>
      </div>
    </div>
  );
}
