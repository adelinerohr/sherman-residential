import { link } from "@/payload/fields/link";
import {
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  OrderedListFeature,
  ParagraphFeature,
  UnderlineFeature,
  UnorderedListFeature,
} from "@payloadcms/richtext-lexical";
import { Block } from "payload";

export const MasonryGrid: Block = {
  slug: "masonryGrid",
  interfaceName: "MasonryGridBlock",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Row 1",
          fields: [
            {
              name: "rowOne",
              type: "group",
              label: false,
              fields: [
                {
                  name: "tag",
                  type: "text",
                  label: "Tagline",
                },
                {
                  name: "header",
                  type: "text",
                  label: "Header",
                  required: true,
                },
                {
                  name: "richText",
                  type: "richText",
                  label: "Content",
                  required: true,
                  editor: lexicalEditor({
                    features: () => {
                      return [
                        BoldFeature(),
                        ItalicFeature(),
                        ParagraphFeature(),
                        UnderlineFeature(),
                        UnorderedListFeature(),
                        OrderedListFeature(),
                        HeadingFeature({ enabledHeadingSizes: ["h4"] }),
                        FixedToolbarFeature(),
                        InlineToolbarFeature(),
                      ];
                    },
                  }),
                },
                link({ appearances: false }),
                {
                  name: "media",
                  type: "upload",
                  relationTo: "media",
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: "Row 2",
          fields: [
            {
              name: "rowTwo",
              type: "group",
              label: false,
              fields: [
                {
                  name: "tag",
                  type: "text",
                  label: "Tagline",
                },
                {
                  name: "header",
                  type: "text",
                  label: "Header",
                  required: true,
                },
                {
                  name: "richText",
                  type: "richText",
                  label: "Content",
                  required: true,
                  editor: lexicalEditor({
                    features: () => {
                      return [
                        BoldFeature(),
                        ItalicFeature(),
                        ParagraphFeature(),
                        UnderlineFeature(),
                        UnorderedListFeature(),
                        OrderedListFeature(),
                        HeadingFeature({ enabledHeadingSizes: ["h4"] }),
                        FixedToolbarFeature(),
                        InlineToolbarFeature(),
                      ];
                    },
                  }),
                },
                link({ appearances: false }),
                {
                  name: "media",
                  type: "upload",
                  relationTo: "media",
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  labels: {
    plural: "Masonry Grids",
    singular: "Masonry Grid",
  },
};
