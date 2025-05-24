import { defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons";

export default defineType({
  name: "archiveBanner",
  title: "Archive Banner",
  type: "document",
  icon: ImageIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'media',
      title: 'Media',
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Banner Title",
      type: "string",
      validation: Rule => Rule.required(),
      group: 'content'
    }),
    defineField({
      name: "description",
      title: "Banner Description",
      type: "text",
      rows: 2,
      validation: Rule => Rule.required(),
      group: 'content'
    }),
    defineField({
      name: "image",
      title: "Banner Image",
      type: "image",
      options: {
        hotspot: true
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessibility."
        }
      ],
      validation: Rule => Rule.required(),
      group: 'media'
    }),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
      initialValue: "Read Latest Article",
      validation: Rule => Rule.required(),
      group: 'content'
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image'
    }
  }
}); 