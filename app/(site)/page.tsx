import { getPages, getPublications } from '@/sanity/sanity-utils';
import { getAnnouncements } from '@/sanity/sanity-utils';
import { PortableText } from '@portabletext/react';
import '../../styles/style.css';

import Image from 'next/image';
import Link from 'next/link';
import EventBlock from '@/components/EventDropdown';
import PublicationsLink from '@/components/PublicationsLink';
import PublicationCarousel from '@/components/PublicationsCarousel';
import Footer from '@/components/Footer';

// Add this line - revalidate every 60 seconds
export const revalidate = 60;

export default async function Home() {
  const publications = await getPublications();
  const announcements = await getAnnouncements();
  const pages = await getPages();
  const aboutPage = pages.find((page) => page.slug === 'about');

  if (!aboutPage) {
    return <div>About page not found</div>;
  }


  const now = new Date();
  const activeAnnouncements = announcements.filter(
    (a) => a.validUntil && new Date(a.validUntil) > now
  );

  //and then all the publications get spit out here

  return (
    <div id="content" className="flex flex-col min-h-[400px]">
      <div id="sections" className="flex-1 w-full">

        {activeAnnouncements.length > 0 && (
          <section id="announcements-section" className="bg-[#F5C3C0] w-full flex flex-col md:flex-row p-[20px] min-h-[400px] relative shadow-[0_0_0.8rem_0.8rem_#F5C3C0]">

            {/* Sidebar */}
            <div id="section-sidebar" className="font-oso font-semibold leading-[0.9] relative z-20 text-2xl
             w-[20%] max-w-[200px] p-2.5 pt-12">
              <Link href="/announcements"><p className="md:text-[clamp(1rem,2vw,1.5rem)]"> Announcements </p></Link>
            </div>

            {/* Main Content */}
            <div id="section-main" className="items-center flex flex-col p-5 pb-15 w-full md:w-[80%]">
              {/* Former loose <body id="updates-page"> here */}
              <div id="announcements-container" className="justify-left flex flex-col md:flex-row w-full max-w-screen-xl"> {/* FKA container */}

                {/* Column A */}
                <div id="announcements-columnA" className="md:w-1/2">
                  {activeAnnouncements.map((announcement) => (
                    <div key={announcement._id}>
                      <h2 className="text-[clamp(1.5em,4vw,3em)] py-7">{announcement.title}</h2>

                      {announcement.images?.map((img, i) => (
                        <div key={img} className="w-full relative mx-auto flex flex-col items-center">
                          <div id="image-container" className="w-full">
                            <Image
                              src={img}
                              alt={announcement.captions?.[i] || `Image ${i + 1}`}
                              width={800}
                              height={400}
                            />
                          </div>

                          {announcement.captions?.[i] && (
                            <div id="image-caption" className="w-full text-left italic mt-[10px] mb-[30px]">
                              <p>{announcement.captions[i]}</p>
                            </div>
                          )}
                        </div>
                      ))}

                      <div id="event-copy">
                        <PortableText value={announcement.eventDescription} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                {/* Vertical divider for md+ screens */}
                <Image
                  id="vert-divider"
                  className="hidden md:block py-[50px] mt-[100px] ml-[80px] w-[5%] max-h-[650px]"
                  src="/SVG/line_vert.svg"
                  alt="Vertical Divider"
                  width="40"
                  height="650"
                />

                {/* Horizontal divider for small screens */}
                <Image
                  id="horiz-divider"
                  className="block md:hidden py-[50px] mx-auto my-4 w-full max-w-[650px] h-auto"
                  src="/SVG/line_horiz.svg"
                  alt=""
                  aria-hidden="true"
                  role="presentation"
                  width="40"
                  height="650"
                />

                {/* Column B */}
                <div id="announcements-columnB" className="w-full md:w-[30%] p-[30px]">
                  <div id="Dates">
                    <h2 className="text-center">Dates:</h2>
                    {activeAnnouncements.map((announcement) => (
                      <div key={announcement._id}>
                        {(() => {
                          const now = new Date();

                          const upcoming = announcement.eventDates
                            .filter(e => new Date(e.date) >= now)
                            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

                          const past = announcement.eventDates
                            .filter(e => new Date(e.date) < now)
                            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

                          const sortedEvents = [...upcoming, ...past];

                          return sortedEvents.map((event, i) => {
                            const isPast = new Date(event.date) < now;

                            return (
                              <div
                                key={i}
                                className={`mb-4 transition-all duration-300 ${isPast ? 'opacity-50 grayscale' : ''}`}
                              >
                                <EventBlock event={event} />
                              </div>
                            );
                          });
                        })()}


                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </section>
        )}

      </div>

      <section id="publications-section" className="bg-[#d9f5b8] w-full flex flex-col md:flex-row p-[20px] min-h-[600px] relative shadow-[0_0_0.8rem_0.8rem_#d9f5b8]">

        {/* Sidebar */}
        <div id="section-sidebar" className="font-oso font-semibold leading-[0.9] relative z-20 text-2xl w-[20%] max-w-[200px] p-2.5 pt-12">
          {/*<Link href="<PublicationsLink />"><p className="md:text-[clamp(1rem,2vw,1.5rem)]">Publications</p></Link>*/}
          <PublicationsLink />

        </div>
        <div id="section-main" className="w-[80%] p-[20px] flex flex-col justify-center items-center">
          <PublicationCarousel publications={publications} />
        </div>
      </section>

      <section id="about-section" className="flex flex-col md:flex-row bg-[#c1c1f3] w-full p-[20px] min-h-[600px] relative shadow-[0_0_0.8rem_0.8rem_#c1c1f3]">
        {/* Sidebar */}
        <div id="section-sidebar" className="font-oso font-semibold leading-[0.9] relative z-20 text-2xl w-full md:w-[20%] max-w-[200px] p-2.5 pt-12">
          <Link href="/about">
            <p className="md:text-[clamp(1rem,2vw,1.5rem)]">About</p>
          </Link>
        </div>

        {/* Main Content */}
        <div id="section-main" className="w-full md:w-[80%] p-[20px] flex flex-col justify-center items-center">
          <div className="w-full flex flex-col md:flex-row justify-between items-start gap-[40px] p-[20px]">
            {/* Column A */}
            <div id="columnA" className="w-full md:w-[50%] m-[5px]">
              <PortableText value={aboutPage.columnA} />
            </div>

            {/* Column B */}
            <div id="columnB" className="w-full md:w-[50%] m-[5px]">
              <PortableText value={aboutPage.columnB} />
            </div>
          </div>

          {/* Contact info */}
          <div className="w-full text-center pt-[40px] px-[20px]">
            <PortableText value={aboutPage.contactInfo} />
          </div>
        </div>
      </section>


      <Footer />
    </div>


  );

}



