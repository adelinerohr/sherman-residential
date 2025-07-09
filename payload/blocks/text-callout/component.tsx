import type { TextCalloutBlock as TextCalloutBlockProps } from "@/payload-types";

export function TextCalloutBlock({ header, content }: TextCalloutBlockProps) {
  return (
    <div className="container py-16 flex justify-start">
      <div className="max-w-3xl flex flex-col gap-4">
        <h2 className="font-display font-medium text-4xl text-primary">
          {header}
        </h2>
        <p className="leading-[2]">{content}</p>
      </div>
    </div>
  );
}
