import { Media } from "@/components/fragments/media";
import { RichText } from "@/components/helpers/rich-text";
import { buttonVariants } from "@/components/ui/button";
import type { MasonryGridBlock as MasonryGridBlockProps } from "@/payload-types";
import { LinkField } from "@/payload/custom-types";
import Link from "next/link";

export function MasonryGridBlock({ rowOne, rowTwo }: MasonryGridBlockProps) {
  return (
    <div className="container flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-[0.75fr_1fr] gap-8">
        {rowOne.media && (
          <div className="relative min-h-auto aspect-square sm:aspect-auto">
            <Media
              fill
              imgClassName="object-cover"
              pictureClassName=""
              resource={rowOne.media}
            />
          </div>
        )}
        <TextBox {...rowOne} />
      </div>
      <div className="flex sm:grid flex-col-reverse sm:grid-cols-[1fr_0.75fr] gap-8">
        <TextBox {...rowTwo} />
        {rowTwo.media && (
          <div className="relative min-h-auto aspect-square sm:aspect-auto">
            <Media
              fill
              imgClassName="object-cover"
              pictureClassName=""
              resource={rowTwo.media}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function TextBox({
  tag,
  header,
  richText,
  link,
}: {
  tag?: string | null;
  header: string;
  richText: any;
  link: LinkField;
}) {
  return (
    <div className="bg-muted p-6 sm:p-14 flex flex-col justify-center items-start gap-4">
      <div className="flex flex-col gap-2">
        {tag && (
          <span className="font-display font-bold uppercase tracking-wide text-sm text-primary">
            {tag}
          </span>
        )}
        <h2 className="text-4xl font-display font-medium leading-[1.1] text-primary">
          {header}
        </h2>
      </div>
      {richText && <RichText data={richText} enableGutter={false} />}
      <Link
        className={buttonVariants({ variant: "default" })}
        href={link.url ?? ""}
        target={link.newTab ? "_blank" : undefined}
      >
        {link.label}
      </Link>
    </div>
  );
}
