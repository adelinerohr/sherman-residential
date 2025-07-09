import type { GlobalConfig } from "payload";

import { link } from "~/fields/link";
import { revalidateFooter } from "./hooks/revalidate-footer";

export const Footer: GlobalConfig = {
  slug: "footer",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "company",
      type: "group",
      label: "Company Links",
      fields: [
        {
          name: "navItems",
          type: "array",
          fields: [
            link({
              appearances: false,
            }),
          ],
          maxRows: 6,
          admin: {
            initCollapsed: true,
          },
        },
      ],
    },
    {
      name: "communities",
      type: "group",
      label: "Communities Links",
      fields: [
        {
          name: "navItems",
          type: "array",
          fields: [
            link({
              appearances: false,
            }),
          ],
          maxRows: 6,
          admin: {
            initCollapsed: true,
          },
        },
      ],
    },
    {
      name: "contact",
      type: "group",
      label: "Contact Links",
      fields: [
        {
          name: "navItems",
          type: "array",
          fields: [
            link({
              appearances: false,
            }),
          ],
          maxRows: 6,
          admin: {
            initCollapsed: true,
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
};
