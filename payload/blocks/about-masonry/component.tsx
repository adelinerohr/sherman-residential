import { Media } from "@/components/fragments/media";
import { buttonVariants } from "@/components/ui/button";
import type {
  AboutMasonryBlock as AboutMasonryBlockProps,
  Media as MediaType,
} from "@/payload-types";
import Link from "next/link";

export function AboutMasonryBlock({
  heading,
  link,
  headerImage,
  values,
  images,
}: AboutMasonryBlockProps) {
  return (
    <div className="bg-muted container py-16 flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_0.75fr] gap-8">
        <div className="flex flex-col gap-4 items-start justify-center">
          <h2 className="text-[2.75rem] leading-[1.1] text-primary font-display font-medium">
            {heading}
          </h2>
          <Link
            className={buttonVariants({ variant: "default" })}
            href={link.url ?? ""}
            target={link.newTab ? "_blank" : undefined}
          >
            {link.label}
          </Link>
        </div>
        <div className="relative min-h-auto aspect-3/2">
          <Media
            fill
            imgClassName="object-cover"
            pictureClassName=""
            resource={headerImage}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div className="relative min-h-auto aspect-square">
          <Media
            fill
            imgClassName="object-cover"
            pictureClassName=""
            resource={images[0]}
          />
        </div>
        <ValueBlock value={values.valueOne} />
        <ValueBlock value={values.valueTwo} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-[0.75fr_1fr] gap-8">
        <div className="relative min-h-auto aspect-square">
          <Media
            fill
            imgClassName="object-cover"
            pictureClassName=""
            resource={images[1]}
          />
        </div>
        <div className="relative min-h-auto aspect-auto">
          <Media
            fill
            imgClassName="object-cover"
            pictureClassName=""
            resource={images[2]}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <ValueBlock value={values.valueThree} />
        <ValueBlock value={values.valueFour} />
        <div className="relative min-h-auto aspect-auto">
          <Media
            fill
            imgClassName="object-cover"
            pictureClassName=""
            resource={images[0]}
          />
        </div>
      </div>
    </div>
  );
}

function ValueBlock({
  value,
}: {
  value: {
    valueName: string;
    valueDescription: string;
    valueIcon: number | MediaType;
  };
}) {
  return (
    <div className="p-10 flex flex-col gap-4 items-start justify-start bg-primary text-primary-foreground">
      <div className="relative h-[80px]">
        <Media
          imgClassName="size-[80px]"
          pictureClassName=""
          resource={value.valueIcon}
        />
      </div>
      <h4 className="text-xl font-medium">{value.valueName}</h4>
      <p className="leading-[2]">{value.valueDescription}</p>
    </div>
  );
}
