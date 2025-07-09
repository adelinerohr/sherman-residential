import { Block } from "payload";

export const FeaturedProperties: Block = {
  slug: "featuredProperties",
  interfaceName: "FeaturedPropertiesBlock",
  fields: [
    {
      name: "communityOne",
      label: "Community #1",
      type: "relationship",
      relationTo: "communities",
      required: true,
    },
    {
      name: "communityTwo",
      label: "Community #2",
      type: "relationship",
      relationTo: "communities",
      required: true,
    },
    {
      name: "communityThree",
      label: "Community #3",
      type: "relationship",
      relationTo: "communities",
      required: true,
    },
  ],
  labels: {
    plural: "Featured Properties",
    singular: "Featured Properties",
  },
};
