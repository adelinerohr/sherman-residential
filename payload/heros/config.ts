import type { Field } from "payload";

import { link } from "~/fields/link";

export const hero: Field = {
  name: "hero",
  type: "group",
  fields: [
    {
      name: "type",
      type: "select",
      defaultValue: "boxed",
      label: "Type",
      options: [
        {
          label: "None",
          value: "none",
        },
        {
          label: "Full Screen",
          value: "fullScreen",
        },
        {
          label: "Boxed",
          value: "boxed",
        },
        {
          label: "Small",
          value: "small",
        },
      ],
      required: true,
    },
    {
      name: "heading",
      type: "text",
      label: "Heading",
    },
    {
      name: "media",
      type: "upload",
      relationTo: "media",
    },
  ],
  label: false,
};
