import { getPublication, getPublications } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import PublicationTitle from "@/components/PublicationTitle";
import ColophonSection from "@/components/ColophonSection";
import Footer from "@/components/Footer";
import type { Publication } from "@/types/Publication";

type Props = {
  params: { publication: string };
};

export default async function Publication({ params }: Props) {
  const slug = params.publication;
  const publication = await getPublication(slug);
  const publications = await getPublications();

  if (!publication) {
    return <div>Publication not found.</div>;
  }

  return (
    <div>
      <div className="font-unica bg-[#8296f5] text-black min-h-screen font-thin tracking-tight ">
        <div className="flex flex-col md:flex-row w-full pb-[100px]">
          {/* Sidebar */}
          <div
            className="
            w-full md:w-1/4 
            max-w-full md:max-w-[300px] 
            border-black 
            border-b md:border-b-0 md:border-r 
            bg-[#8296f5]
            mt-[50px] md:mt-[100px]
            p-4 
            flex md:flex-col flex-row 
            gap-4 md:gap-2 
            overflow-x-auto md:overflow-y-auto
            scroll-smooth snap-x
          "
          >
            <p
              className="font-oso font-bold text-[1.5em] md:text-[2em] underline underline-offset-4 md:mb-[25px] shrink-0"
              style={{ fontStretch: "70%" }}
            >
              Publications
            </p>

            <ul className="flex md:flex-col flex-row md:space-y-2 space-x-4 md:space-x-0">
              {publications.map((publication: Publication) => (
                <li
                  key={publication._id}
                  className="publication-item font-oso font-medium leading-[1.1] text-[1em] p-[10px] shrink-0 md:w-auto w-[200px]"
                >
                  <Link
                    href={`/publications/${publication.slug}`}
                    className="block hover:underline"
                  >
                    <strong>
                      <PublicationTitle title={publication.title} />
                    </strong>
                    {publication.author && (
                      <p className="text-sm italic">{publication.author}</p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Content */}
          <div className="w-full mt-[20px] md:mt-[50px] p-6">
            <div className="max-w-3xl mx-auto">
              {publication.frontcover && (
                <Image
                  priority
                  src={publication.frontcover}
                  alt={
                    publication.alt || `Cover image for ${publication.title}`
                  }
                  width={300}
                  height={300}
                  className="mt-4 object-cover w-full max-w-[300px] h-auto"
                />
              )}

              <header className="mb-6">
                <p
                  className="font-oso font-bold leading-[0.9] relative z-[2] text-[2.5em] md:text-[3.2em] text-left mt-[50px]"
                  style={{ fontStretch: "70%" }}
                >
                  <PublicationTitle title={publication.title} />
                </p>
                <p className="font-oso font-bold leading-[0.9] relative z-[2] text-[1.1em] text-left mt-[5px]">
                  {publication.author}
                </p>
              </header>

              <div className="mt-6">
                <PortableText value={publication.content} />
              </div>

              <ColophonSection
                stock={publication.stock}
                specs={publication.specs}
                shopifyProductId={publication.shopifyProductId}
              />

              {Array.isArray(publication.spreads) &&
                publication.spreads.length > 0 && (
                  <div className="mt-10 space-y-8">
                    {publication.spreads.map(
                      (spreadUrl: string, index: number) => (
                        <Image
                          key={index}
                          src={spreadUrl}
                          alt={`${publication.title} spread ${index + 1}`}
                          width={1920}
                          height={1080}
                          className="object-cover w-full h-auto"
                        />
                      )
                    )}
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
      <div className="z-index-10 relative">
        <Footer />
      </div>
    </div>
  );
}

