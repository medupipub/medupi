import { Publication } from "@/types/Publication";
import { createClient, groq } from "next-sanity";
import clientConfig from "./schemas/config/client-config";
import { Page } from "@/types/Page";
import { Announcement } from "@/types/Announcement";
import { marked } from 'marked'
import { PortableTextBlock } from "sanity";


export async function getPublications(): Promise<Publication[]> {
  try {
    const publications = await createClient(clientConfig).fetch<Publication[]>(
      groq`*[_type == "publication"] | order(sortOrder desc) {
        _id,
        _createdAt,
        sortOrder,
        title,
        author,
        "slug": slug.current,
        "frontcover": frontcover.asset->url,
        alt,
        content,
        stock,
        shopifyProductId,
        "specs": {
          "year": specs.year,
          "language": specs.language,
          "pages": specs.pages,
          "physical": specs.physical,
          "isbn": specs.isbn
        },
        "spreads": spreads[].asset->url
      }`
    );

    return publications ?? [];
  } catch (error) {
    console.error("Failed to fetch publications:", error);
    return [];
  }
}

export async function getPublication(slug: string): Promise<Publication> { // this function will be used to get a single publication
  return createClient(clientConfig).fetch(
    groq`*[_type == "publication" && slug.current == $slug][0]
    {
        _id,
        _createdAt,
       sortOrder,
        title,
        author,
        "slug": slug.current,
        "frontcover": frontcover.asset->url,
        alt,
        content,
        stock,
        shopifyProductId,
       "specs": {
    "year": specs.year,
    "language": specs.language,
    "pages": specs.pages,
    "physical": specs.physical,
    "isbn": specs.isbn
}, 
        "spreads": spreads[].asset->url     
        }`,
    { slug } // this will be used to get the slug from the url //loadbearing, missed this the first time! 
  )
}
// this will get the first publication with the slug // we use [0] to get the first element of the array

export async function getPages(): Promise<Page[]> {
  return createClient(clientConfig).fetch(
    groq` *[_type == "page"]{
      _id,
      _createdAt,
      title,
      "slug": slug.current,
      columnA,
      columnB,
      contactInfo
    }`
  );
}

export async function getPage(slug: string): Promise<Page> {
  return createClient(clientConfig).fetch(
    groq` *[_type == "page" && slug.current == $slug][0]{
            _id,
            _createdAt,
            title,
            "slug": slug.current,
            columnA,
            columnB,
            contactInfo,      
            }`,
    { slug }
  );
}

export async function getAnnouncements(): Promise<Announcement[]> {
  return createClient(clientConfig).fetch(
    //clean up this groq
    groq`*[_type == "announcement"] | order(_createdAt desc) {
      _id,
      _createdAt,
      title,
      "slug": slug.current,
      "images": images[].asset->url,
      captions,
      eventDescription,
      validUntil,
      eventDates[] {
        date,
        venue,
        address,
        time,
        description,
      }
    }`
  )
}


export async function getAnnouncement(slug: string): Promise<Announcement> {
  return createClient(clientConfig).fetch(
    //clean up this groq
    groq
      `*[_type == "announcement" && slug.current == $slug][0] {
      _id,
      _createdAt,
      title,
      "slug": slug.current,
      "images": images[].asset->url,
      captions,
      eventDescription,
      validUntil,
      eventDates[] {
        date,
        venue,
        address,
        time,
        description,
      }
    }`,
    { slug }
  );
}
