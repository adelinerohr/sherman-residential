import { link } from "@/payload/fields/link";
import { Block } from "payload";

export const AboutMasonry: Block = {
  slug: "aboutMasonry",
  interfaceName: "AboutMasonryBlock",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Header",
          fields: [
            {
              name: "heading",
              type: "text",
              label: "Heading",
              required: true,
            },
            link({ appearances: false }),
            {
              name: "headerImage",
              type: "upload",
              relationTo: "media",
              required: true,
              label: "Header Image",
            },
          ],
        },
        {
          label: "Grid",
          fields: [
            {
              name: "values",
              label: "Values",
              type: "group",
              fields: [
                {
                  name: "valueOne",
                  label: "Value #1",
                  type: "group",
                  fields: [
                    {
                      name: "valueName",
                      type: "text",
                      required: true,
                      label: "Value",
                    },
                    {
                      name: "valueDescription",
                      type: "textarea",
                      required: true,
                      label: "Value Description",
                    },
                    {
                      name: "valueIcon",
                      type: "upload",
                      relationTo: "media",
                      required: true,
                    },
                  ],
                },
                {
                  name: "valueTwo",
                  label: "Value #2",
                  type: "group",
                  fields: [
                    {
                      name: "valueName",
                      type: "text",
                      required: true,
                      label: "Value",
                    },
                    {
                      name: "valueDescription",
                      type: "textarea",
                      required: true,
                      label: "Value Description",
                    },
                    {
                      name: "valueIcon",
                      type: "upload",
                      relationTo: "media",
                      required: true,
                    },
                  ],
                },
                {
                  name: "valueThree",
                  label: "Value #3",
                  type: "group",
                  fields: [
                    {
                      name: "valueName",
                      type: "text",
                      required: true,
                      label: "Value",
                    },
                    {
                      name: "valueDescription",
                      type: "textarea",
                      required: true,
                      label: "Value Description",
                    },
                    {
                      name: "valueIcon",
                      type: "upload",
                      relationTo: "media",
                      required: true,
                    },
                  ],
                },
                {
                  name: "valueFour",
                  label: "Value #4",
                  type: "group",
                  fields: [
                    {
                      name: "valueName",
                      type: "text",
                      required: true,
                      label: "Value",
                    },
                    {
                      name: "valueDescription",
                      type: "textarea",
                      required: true,
                      label: "Value Description",
                    },
                    {
                      name: "valueIcon",
                      type: "upload",
                      relationTo: "media",
                      required: true,
                    },
                  ],
                },
              ],
            },
            {
              name: "images",
              label: "Images (must pick 4)",
              type: "upload",
              relationTo: "media",
              hasMany: true,
              minRows: 4,
              maxRows: 4,
              required: true,
            },
          ],
        },
      ],
    },
  ],
  labels: {
    plural: "About Masonries",
    singular: "About Masonry",
  },
};
