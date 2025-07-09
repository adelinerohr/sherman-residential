import { Media } from "@/components/fragments/media";
import type { TestimonialBlock as TestimonialBlockProps } from "@/payload-types";
import banner from "@/public/banner-texture.png";
import Image from "next/image";

export function TestimonialBlock({
  testimonial,
  author,
  media,
}: TestimonialBlockProps) {
  return (
    <div className="flex flex-col">
      <div className="bg-primary container py-10 grid grid-cols-1 sm:grid-cols-[0.75fr_1fr] gap-8 min-h-auto">
        <div className="relative min-h-auto aspect-square ">
          <Media
            fill
            imgClassName="object-cover"
            pictureClassName=""
            resource={media}
          />
        </div>
        <div className="p-10 bg-muted flex items-start justify-center gap-4 flex-col">
          <div className="text-primary font-display font-medium text-2xl">
            "{testimonial}"
          </div>
          <div className="text-xl font-medium">- {author}</div>
        </div>
      </div>
      <div className="w-full relative h-5">
        <Image src={banner} fill alt="banner" className="object-cover" />
      </div>
    </div>
  );
}
