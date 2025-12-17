import { PortableTextBlock } from "sanity";

export type EventDate = {
  date: string;
  venue: string;
  address: string;
  time: string;
  description: string;
};

export type Note = {
  _id: string;
  _createdAt: Date;
  title: string;
  slug: string;
  images: string[];
  captions: string[];
  pdf?: {
  asset?: {
    url: string;
    originalFilename?: string;
    size?: number;
  }
}
  eventDescription: PortableTextBlock[];
  validUntil: Date;
  eventDates: EventDate[];
};


