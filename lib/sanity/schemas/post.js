export default {
  name: "post",
  title: "Post",
  type: "document",
  initialValue: () => ({
    publishedAt: new Date().toISOString()
  }),
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      }
    },
    {
      name: "excerpt",
      title: "Excerpt",
      description:
        "The excerpt is used in blog feeds, and also for search results",
      type: "text",
      rows: 3,
      validation: Rule => Rule.max(200)
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" }
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      description: "This will be used as the thumbnail and hero image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessibility."
        }
      ],
      options: {
        hotspot: true
      }
    },
    {
      name: "mediaContent",
      title: "Media Content",
      type: "array",
      description: "Add various media content to your post",
      of: [
        {
          type: "object",
          name: "imageSection",
          title: "Image Section",
          fields: [
            {
              name: "title",
              type: "string",
              title: "Section Title"
            },
            {
              name: "image",
              type: "image",
              title: "Image",
              options: {
                hotspot: true
              },
              fields: [
                {
                  name: "alt",
                  type: "string",
                  title: "Alternative text",
                  description: "Important for SEO and accessibility."
                },
                {
                  name: "caption",
                  type: "string",
                  title: "Caption",
                  description: "Appears below the image"
                }
              ]
            }
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image'
            }
          }
        },
        {
          type: "object",
          name: "videoSection",
          title: "Video Section",
          fields: [
            {
              name: "title",
              type: "string",
              title: "Section Title"
            },
            {
              name: "videoFile",
              title: "Video File",
              type: "file",
              options: {
                accept: "video/*"
              }
            },
            {
              name: "videoUrl",
              title: "External Video URL",
              description: "URL from YouTube, Vimeo, or other video platforms",
              type: "url"
            },
            {
              name: "thumbnail",
              title: "Video Thumbnail",
              type: "image",
              options: {
                hotspot: true
              }
            },
            {
              name: "description",
              type: "text",
              title: "Description",
              rows: 2
            }
          ],
          preview: {
            select: {
              title: 'title',
              media: 'thumbnail'
            }
          }
        },
        {
          type: "object",
          name: "audioSection",
          title: "Audio Section",
          fields: [
            {
              name: "title",
              type: "string",
              title: "Section Title"
            },
            {
              name: "audioFile",
              title: "Audio File",
              type: "file",
              options: {
                accept: "audio/*"
              }
            },
            {
              name: "audioUrl",
              title: "External Audio URL",
              description: "URL from SoundCloud, Spotify, or other audio platforms",
              type: "url"
            },
            {
              name: "waveform",
              title: "Waveform Image",
              type: "image",
              description: "Visual representation of the audio"
            },
            {
              name: "description",
              type: "text",
              title: "Description",
              rows: 2
            }
          ],
          preview: {
            select: {
              title: 'title',
              media: 'waveform'
            }
          }
        }
      ]
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }]
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime"
    },
    {
      name: "featured",
      title: "Mark as Featured",
      type: "boolean"
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent"
    }
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage"
    },
    prepare(selection) {
      const { author } = selection;
      return {
        ...selection,
        subtitle: author && `by ${author}`
      };
    }
  }
};
