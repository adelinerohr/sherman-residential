import { Page } from "@/payload-types";
import { FullScreenHero } from "./full-screen-hero";
import { BoxedHero } from "./boxed-hero";
import { SmallHero } from "./small-hero";

const heroes = {
  boxed: BoxedHero,
  fullScreen: FullScreenHero,
  small: SmallHero,
};

export function RenderHero(props: Page["hero"]) {
  const { type } = props || {};

  if (!type || type === "none") return null;

  const HeroToRender = heroes[type];

  if (!HeroToRender) return null;

  return <HeroToRender {...props} />;
}
