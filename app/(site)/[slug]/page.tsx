// app/(site)/[slug]/page.tsx
import { getPage } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import Footer from "@/components/Footer";
import PortableTextRenderer from "@/components/PortableTextRenderer";

// Add this line - revalidate every 60 seconds
export const revalidate = 60;

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await the params Promise
  const { slug } = await params;
  const page = await getPage(slug);

  // Special layout for the About page
  if (slug === "about") {
    return (
      <div>
        <section
          id="about-section"
          className="flex flex-col md:flex-row bg-[#c1c1f3] w-full p-[20px] min-h-[600px] relative shadow-[0_0_0.8rem_0.8rem_#c1c1f3]"
        >
          {/* Sidebar */}
          <div
            id="section-sidebar"
            className="font-oso font-semibold leading-[0.9] relative z-20 text-2xl w-full md:w-[20%] max-w-[200px] p-2.5 pt-12"
          >
            <Link href="/about">
              <p className="md:text-[clamp(1rem,2vw,1.5rem)]">About</p>
            </Link>
          </div>

          {/* Main Content */}
          <div
            id="section-main"
            className="w-full md:w-[80%] p-[20px] flex flex-col justify-center items-center"
          >
            <div className="w-full flex flex-col md:flex-row justify-between items-start gap-[40px] p-[20px]">
              {/* Column A */}
              <div id="columnA" className="w-full md:w-[50%] m-[5px]">
                <PortableTextRenderer content={page.columnA} />
              </div>

              {/* Column B */}
              <div id="columnB" className="w-full md:w-[50%] m-[5px]">
                <PortableTextRenderer content={page.columnB} />
              </div>
            </div>

            {/* Contact info */}
            <div className="about-contact-info w-full text-center pt-[40px] px-[20px]">
              <PortableTextRenderer content={page.contactInfo} />
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  // Default layout for other pages
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content */}
      <div className="flex-grow p-10 flex flex-col md:flex-row">
        {/* Right section for the title */}
       
        <div
          id="section-sidebar"
          className="font-oso font-semibold leading-[0.9] relative z-20 text-2xl w-full md:w-[20%] max-w-[200px] p-2.5 pt-12"
        >
          <p className="md:text-[clamp(1rem,2vw,1.5rem)]">{page.title}</p>
        </div>


        {/* Left content: the main content columns */}
        <div
            id="section-main"
            className="w-full md:w-[80%] p-[20px] flex flex-col justify-center items-center"
          >
          <div className="mb-6 mt-[10px]">
            <PortableTextRenderer content={page.columnA} />
          </div>
          <div className="mb-6">
            <PortableTextRenderer content={page.columnB} />
          </div>
          <div>
            <PortableTextRenderer content={page.contactInfo} />
          </div>
        </div>


      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}