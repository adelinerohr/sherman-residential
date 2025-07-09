import { Block } from "payload";

export const TextCallout: Block = {
  slug: "textCallout",
  interfaceName: "TextCalloutBlock",
  fields: [
    {
      name: "header",
      type: "text",
      label: "Header",
      required: true,
    },
    {
      name: "content",
      type: "textarea",
      label: "Content",
      required: true,
    },
  ],
  labels: {
    plural: "Text Callouts",
    singular: "Text Callout",
  },
};
