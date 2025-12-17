const announcement = {
  name: 'note',
  title: 'Note',
  type: 'document',
  fields: [

    {
      name: 'title',
      title: 'Title',
      type: 'string',

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
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
    },
    {
      name: 'captions',
      title: 'Captions for Images',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Captions should be in the same order as the images above.',
    },
    {
      name: 'pdf',
      title: 'PDF (optional)',
      type: 'file',
      options: {
        accept: 'application/pdf',
      }
    },
    {
      name: 'eventDescription',
      title: 'Event Description',
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: 'validUntil',
      title: 'Valid Until',
      type: 'datetime',
      description: 'Use this to determine if the announcement should be archived after this date.',
    },
    {
      name: 'eventDates',
      title: 'Event Dates',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'date',
              title: 'Date',
              type: 'datetime',

            },
            {
              name: 'venue',
              title: 'Venue Name',
              type: 'string',
            },
            {
              name: 'address',
              title: 'Address',
              type: 'string',
            },
            {
              name: 'time',
              title: 'Time',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'string',
            },

          ]
        },
      ],
    },
  ],
};


export default announcement;