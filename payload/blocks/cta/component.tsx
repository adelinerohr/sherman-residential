import type { CallToActionBlock as CTABlockProps } from "@/payload-types";

import { CMSLink } from "@/components/fragments/cms-link";

export function CallToActionBlock({ link, richText }: CTABlockProps) {
  return (
    <div className="container">
      <div className="bg-card rounded border-border border p-4 flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
        <div className="flex flex-col gap-8">
          <CMSLink size="lg" {...link} />
        </div>
      </div>
    </div>
  );
}
