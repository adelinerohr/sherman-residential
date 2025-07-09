import { GlobalConfig } from "payload";
import { revalidateHeader } from "./hooks/revalidate-header";
import { link } from "~/fields/link";

export const Header: GlobalConfig = {
  slug: "header",
  fields: [
    {
      name: "navItems",
      type: "array",
      fields: [link({ appearances: false })],
      maxRows: 6,
      admin: {
        initCollapsed: true,
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
};
