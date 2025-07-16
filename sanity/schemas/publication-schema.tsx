const publication = {
  name: "publication",
  title: "Publication",
  type: "document",
  fields: [
    {
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "author",
      title: "Author",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" }
    },
    {
      name: "frontcover",
      title: "Front Cover",
      type: "image",
    },
    {
      name: "alt",
      title: "Alt Text",
      type: "string",
      options: { source: "title" }

    },

    {
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
      //this allows for rich text editing
    },
    {
      name: "stock",
      title: "Stock",
      type: "array",
      of: [{ type: "block" }],
      //this allows for rich text editing
    },
    {
      name: "shopifyProductId",
      title: "Shopify Product ID",
      type: "string",
      description: "Paste the Shopify product ID here (e.g. 11942404129086)",
    },
    {
      name: "specs",
      title: "Specifications",
      type: "object",
      fields: [
        {
          name: "year",
          title: "Year",
          type: "string",
        },
        {
          name: "language",
          title: "Language",
          type: "string",
        },
        {
          name: "pages",
          title: "Pages",
          type: "string",
        },
        {
          name: "physical",
          title: "Physical Format",
          type: "string",
        },
        {
          name: "isbn",
          title: "ISBN",
          type: "string",
        },
      ],
    },
    {
      name: "spreads",
      title: "Spreads",
      type: "array",
      description: "Drag images of spreads here. Ideally upload 4 images per publication.",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    }
  ],
}

export default publication; 