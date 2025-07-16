import { PortableTextBlock } from "sanity";

export type Announcement = {
    _id: string;
    _createdAt: Date;
    title: string;
    slug: string;
    images: string[];
    captions: string[];
    eventDescription: PortableTextBlock[];
    validUntil: Date;
    eventDates: {
        date: string;
        venue: string;
        address: string;
        time: string;
        description: string;
    }[];


};


