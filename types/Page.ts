import { PortableTextBlock } from "sanity";

export type Page = {
  _id: string;
  _createdAt: Date;
  title: string;
  slug: string;
  columnA: PortableTextBlock[];
  columnB: PortableTextBlock[];
  contactInfo: PortableTextBlock[];
};