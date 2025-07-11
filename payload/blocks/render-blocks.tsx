import React, { Fragment } from "react";

import type { Page } from "@/payload-types";

import { CallToActionBlock } from "./cta/component";
import { StatsBlock } from "./stats/component";
import { MasonryGridBlock } from "./masonry/component";
import { TextCalloutBlock } from "./text-callout/component";
import { FeaturedPropertiesBlock } from "./featured-properties/component";
import { TestimonialBlock } from "./testimonial/component";
import { AboutMasonryBlock } from "./about-masonry/component";
import { TeamMembersBlock } from "./team-members/component";

const blockComponents = {
  cta: CallToActionBlock,
  stats: StatsBlock,
  masonryGrid: MasonryGridBlock,
  textCallout: TextCalloutBlock,
  featuredProperties: FeaturedPropertiesBlock,
  testimonial: TestimonialBlock,
  aboutMasonry: AboutMasonryBlock,
  teamMembers: TeamMembersBlock,
};

export const RenderBlocks: React.FC<{
  blocks: Page["layout"][0][];
}> = (props) => {
  const { blocks } = props;

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block;

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType];

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              );
            }
          }
          return null;
        })}
      </Fragment>
    );
  }

  return null;
};
