import { authenticated, authenticatedOrPublished } from "@/payload/access";
import { populatePublishedAt } from "@/payload/hooks/populate-published-at";
import { CollectionConfig } from "payload";

export const Team: CollectionConfig<"team"> = {
  slug: "team",
  orderable: true,
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    name: true,
  },
  admin: {
    defaultColumns: ["name", "jobTitle", "updatedAt"],
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Team Member Name",
      required: true,
    },
    {
      name: "jobTitle",
      type: "text",
      label: "Job Title",
      required: true,
    },
    {
      name: "bio",
      type: "textarea",
      label: "Bio",
    },
    {
      name: "headshot",
      label: "Headshot",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
  ],
  hooks: {
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 1000, // We can make this longer because there is no live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
  labels: {
    plural: "Team Members",
    singular: "Team Member",
  },
};
