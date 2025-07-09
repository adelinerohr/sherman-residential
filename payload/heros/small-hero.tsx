import { Page } from "@/payload-types";

export function SmallHero({ heading }: Page["hero"]) {
  return (
    <div className="bg-primary container text-primary-foreground py-12">
      <h1 className="font-display font-medium text-5xl">{heading}</h1>
    </div>
  );
}
