import { PortableTextBlock } from "sanity";

export type Publication = {
    _id: string;
    _createdAt: Date;
    sortOrder: number;
    title: string;
    author: string;
    slug: string;
    frontcover: string;
    alt: string;
    content: PortableTextBlock[]; //this is how Sanity stores rich text 
    stock: PortableTextBlock[]; //this is how Sanity stores rich text
    shopifyProductId?: string;
    specs: {
        year: string;
        language: string;
        pages: string;
        physical: string;
        isbn: string;
        designer: string;
    }
    spreads: string[];
}