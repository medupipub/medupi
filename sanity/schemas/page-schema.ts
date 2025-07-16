const page = {

    name: "page",
    title: "Page",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
        },
        {
            name: 'columnA',
            title: 'Column A',
            type: 'array',
            of: [{ type: 'block' }],
        },
        {
            name: 'columnB',
            title: 'Column B',
            type: 'array',
            of: [{ type: 'block' }],
        },
        {
            name: 'contactInfo',
            title: 'Contact Info',
            type: 'array',
            of: [{ type: 'block' }],
        }
    ]
}

export default page;