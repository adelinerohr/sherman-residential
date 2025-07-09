import { Block } from "payload";

export const Testimonial: Block = {
  slug: "testimonial",
  interfaceName: "TestimonialBlock",
  fields: [
    {
      name: "testimonial",
      type: "textarea",
      label: "Testimonial",
      required: true,
    },
    {
      name: "author",
      type: "text",
      label: "Author",
      required: true,
    },
    {
      name: "media",
      type: "upload",
      relationTo: "media",
      required: true,
    },
  ],
  labels: {
    plural: "Testimonials",
    singular: "Testimonial",
  },
};
