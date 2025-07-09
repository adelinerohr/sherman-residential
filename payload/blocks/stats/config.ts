import { Block } from "payload";

export const Stats: Block = {
  slug: "stats",
  interfaceName: "StatsBlock",
  fields: [
    {
      name: "boxOne",
      type: "group",
      label: "Box #1",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Title",
          required: true,
        },
        {
          name: "subTitle",
          type: "text",
          label: "Subtitle",
          required: true,
        },
      ],
    },
    {
      name: "boxTwo",
      type: "group",
      label: "Box #2",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Title",
          required: true,
        },
        {
          name: "subTitle",
          type: "text",
          label: "Subtitle",
          required: true,
        },
      ],
    },
    {
      name: "boxThree",
      type: "group",
      label: "Box #3",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Title",
          required: true,
        },
        {
          name: "subTitle",
          type: "text",
          label: "Subtitle",
          required: true,
        },
      ],
    },
  ],
  labels: {
    plural: "Stats Grids",
    singular: "Stats Grid",
  },
};
