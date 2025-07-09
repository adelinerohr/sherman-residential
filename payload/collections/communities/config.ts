import { authenticated, authenticatedOrPublished } from "~/access";
import { CollectionConfig } from "payload";
import { generatePreviewPath } from "~/utilities/generate-preview-path";
import { populatePublishedAt } from "~/hooks/populate-published-at";
import { slugField } from "~/fields/slug";
import {
  revalidateCommunity,
  revalidateDelete,
} from "./hooks/revalidate-community";

export const Communities: CollectionConfig<"communities"> = {
  slug: "communities",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    name: true,
    slug: true,
  },
  admin: {
    defaultColumns: ["name", "slug", "updatedAt"],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === "string" ? data.slug : "",
          collection: "communities",
          req,
        });
        return path;
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === "string" ? data.slug : "",
        collection: "communities",
        req,
      }),
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Community Name",
      required: true,
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Details",
          fields: [
            {
              name: "address",
              type: "group",
              label: false,
              fields: [
                {
                  name: "addressLine1",
                  type: "text",
                  label: "Address Line 1",
                  required: true,
                },
                {
                  name: "addressLine2",
                  type: "text",
                  label: "Address Line 2",
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "city",
                      type: "text",
                      label: "City",
                      required: true,
                      admin: {
                        width: "50%",
                      },
                    },
                    {
                      name: "state",
                      type: "text",
                      label: "State Code",
                      required: true,
                      validate: (value: any) =>
                        value.trim().length === 2 ||
                        "Please enter the state's two-letter code",
                      admin: {
                        width: "15%",
                      },
                    },
                    {
                      name: "zip",
                      type: "text",
                      label: "Zipcode",
                      required: true,
                      admin: {
                        width: "35%",
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: "description",
              type: "textarea",
              label: "Description",
              required: true,
            },
            {
              name: "websiteUrl",
              type: "text",
              label: "Community Website URL",
              required: true,
            },
            {
              type: "row",
              fields: [
                {
                  name: "fund",
                  type: "text",
                  label: "Fund Number(s)",
                  required: true,
                  admin: {
                    width: "50%",
                  },
                },
                {
                  name: "yearAcquired",
                  type: "text",
                  label: "Year Acquired",
                  required: true,
                  admin: {
                    width: "25%",
                  },
                },
                {
                  name: "units",
                  type: "text",
                  label: "Total # of Units",
                  required: true,
                  admin: {
                    width: "25%",
                  },
                },
              ],
            },
            {
              name: "sold",
              type: "checkbox",
              label: "Is the community sold?",
              defaultValue: false,
            },
          ],
        },
        {
          label: "Features",
          fields: [
            {
              name: "features",
              type: "group",
              label: false,
              fields: [
                {
                  name: "featureOne",
                  type: "text",
                  label: "Feature #1",
                  required: true,
                },
                {
                  name: "featureTwo",
                  type: "text",
                  label: "Feature #2",
                  required: true,
                },
                {
                  name: "featureThree",
                  type: "text",
                  label: "Feature #3",
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: "Media",
          fields: [
            {
              name: "featuredImage",
              type: "upload",
              relationTo: "media",
              label: "Featured Image",
              required: true,
            },
            {
              name: "images",
              type: "upload",
              relationTo: "media",
              label: "Images",
              hasMany: true,
              minRows: 4,
              maxRows: 8,
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidateCommunity],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
};
