// app/(site)/[slug]/page.tsx
import { getPage } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import Footer from "@/components/Footer";

interface PageParams {
  slug: string;
}

interface PageProps {
  params: PageParams;
}

export default async function Page({ params }: PageProps) {
  const page = await getPage(params.slug);

  // About page special layout
  if (params.slug === "about") {
    return (
      <div>
        <section
          id="about-section"
          className="flex flex-col md:flex-row bg-[#c1c1f3] w-full p-[20px] min-h-[600px] relative shadow-[0_0_0.8rem_0.8rem_#c1c1f3]"
        >
          <div
            id="section-sidebar"
            className="font-oso font-semibold leading-[0.9] relative z-20 text-2xl w-full md:w-[20%] max-w-[200px] p-2.5 pt-12"
          >
            <Link href="/about">
              <p className="md:text-[clamp(1rem,2vw,1.5rem)]">About</p>
            </Link>
          </div>

          <div
            id="section-main"
            className="w-full md:w-[80%] p-[20px] flex flex-col justify-center items-center"
          >
            <div className="w-full flex flex-col md:flex-row justify-between items-start gap-[40px] p-[20px]">
              <div id="columnA" className="w-full md:w-[50%] m-[5px]">
                <PortableText value={page.columnA} />
              </div>

              <div id="columnB" className="w-full md:w-[50%] m-[5px]">
                <PortableText value={page.columnB} />
              </div>
            </div>

            <div className="w-full text-center pt-[40px] px-[20px]">
              <PortableText value={page.contactInfo} />
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  // Default layout
  return (
    <div>
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-4">{page.title}</h1>
        <div className="mb-6">
          <PortableText value={page.columnA} />
        </div>
        <div className="mb-6">
          <PortableText value={page.columnB} />
        </div>
        <div>
          <PortableText value={page.contactInfo} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
