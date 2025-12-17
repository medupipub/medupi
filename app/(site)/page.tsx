import { getPages, getPublications } from '@/sanity/sanity-utils';
import { getAnnouncements } from '@/sanity/sanity-utils';
import { getNotes } from '@/sanity/sanity-utils';
import NotesPdfClient from '@/components/NotesPdfClient';
import '../../styles/style.css';
import Image from 'next/image';
import Link from 'next/link';
import EventBlock from '@/components/EventDropdown';
import PublicationsLink from '@/components/PublicationsLink';
import PublicationCarousel from '@/components/PublicationsCarousel';
import Footer from '@/components/Footer';
import PortableTextRenderer from '@/components/PortableTextRenderer';

// Add this line - revalidate every 60 seconds
export const revalidate = 60;

export default async function Home() {
  const publications = await getPublications();
  const announcements = await getAnnouncements();
  const notes = await getNotes();
  const pages = await getPages();
  const aboutPage = pages.find((page) => page.slug === 'about');

  if (!aboutPage) {
    return <div>About page not found</div>;
  }

  const now = new Date();
  const activeAnnouncements = announcements.filter(
    (a) => a.validUntil && new Date(a.validUntil) > now
  );
  const activeNotes = notes.filter(
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

                      {/* Updated images section with spacing and captions at end */}
                      {announcement.images && announcement.images.length > 0 && (
                        <div className="w-full space-y-4 mb-8">
                          {announcement.images.map((img, i) => (
                            <div
                              key={img}
                              className="w-full relative mx-auto flex flex-col items-center"
                            >
                              <div id="image-container" className="w-full">
                                <Image
                                  src={img}
                                  alt={announcement.captions?.[i] || `Image ${i + 1}`}
                                  width={800}
                                  height={400}
                                />
                              </div>
                            </div>
                          ))}

                          {/* Captions at the end of all images */}
                          {announcement.captions && announcement.captions.length > 0 && (
                            <div className="w-full text-left italic mt-4">
                              {announcement.captions.map((caption, i) => (
                                <p key={i} className="mb-2">{caption}</p>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      <div id="event-copy">
                        <PortableTextRenderer content={announcement.eventDescription} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Conditional Divider - only show if any announcement has eventDates */}
                {activeAnnouncements.some(announcement => announcement.eventDates && announcement.eventDates.length > 0) && (
                  <>
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
                            {/* Only render dates if eventDates exists and has content */}
                            {announcement.eventDates && announcement.eventDates.length > 0 && (() => {
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
                  </>
                )}
              </div>
            </div>

          </section>
        )}

      </div>

      {/* Notes Section */}
      {activeNotes.length > 0 && (
        <section
          id="notes-section"
          className="bg-[#ffb347] w-full flex flex-col md:flex-row p-[20px] min-h-[400px] relative shadow-[0_0_0.8rem_0.8rem_#ffb347]"
        >
          {/* Sidebar */}
          <div className="font-oso font-semibold leading-[0.9] relative z-20 text-2xl w-[20%] max-w-[200px] p-2.5 pt-12">
            <Link href="/notes">
              <p className="md:text-[clamp(1rem,2vw,1.5rem)]">Notes</p>
            </Link>
          </div>

          {/* Main Content */}
          <div className="flex flex-col p-5 w-full md:w-[80%] max-w-screen-xl">
            {activeNotes.map((note) => (
              <div key={note._id} className="w-full mb-32 flex flex-col items-center">

                {/* 1. Title: Now fully centered */}
                <div className="w-full flex justify-center">
                  <div className="w-full max-w-screen-xl px-5 text-center"> {/* Changed text-left to text-center */}
                    <h2 className="text-[clamp(1.5em,4vw,3em)] py-7">
                      {note.title}
                    </h2>
                  </div>
                </div>

                {/* 2. Centered Media Row (Image + PDF) */}
                <div className="w-full flex justify-center px-4 overflow-hidden">
                  <div className="flex flex-col min-[995px]:flex-row gap-8 min-[1536px]:gap-16 items-center min-[995px]:items-start w-full max-w-[1200px] min-[1536px]:max-w-[1600px] justify-center">

                    {/* Column A: Image Wrapper */}
                    <div className="w-full flex flex-col items-center 
      min-[995px]:w-fit 
      max-w-[450px] 
      max-[599px]:max-w-[350px] 
      max-[399px]:max-w-[290px]
      min-[1536px]:max-w-none"
                    >
                      {note.images?.[0] && (
                        <>
                          <Image
                            src={note.images[0]}
                            alt={note.captions?.[0] || "Note Image"}
                            width={1200} // Increased base width for higher res
                            height={1600}
                            className="w-auto h-auto shadow-sm border border-black/5 object-contain
              min-[995px]:h-[60vh] 
              min-[1536px]:h-[70vh]"
                            priority
                          />
                          {note.captions?.[0] && (
                            <p className="mt-3 text-[11px] italic font-light lowercase leading-tight text-center w-full min-[1536px]:text-[13px]">
                              {note.captions[0]}
                            </p>
                          )}
                        </>
                      )}
                    </div>

                    {/* Column B: PDF Wrapper */}
                    <div className="w-full flex justify-center 
      min-[995px]:w-fit 
      max-w-[450px] 
      max-[599px]:max-w-[350px] 
      max-[399px]:max-w-[290px]
      min-[1536px]:max-w-none"
                    >
                      {note.pdf?.asset?.url && (
                        <NotesPdfClient url={note.pdf.asset.url} title={note.title} />
                      )}
                    </div>

                  </div>
                </div>

                {/* 3. Description: Centered Underneath */}
                <div className="w-full max-w-screen-xl px-5 flex justify-center mt-12">
                  <div className="w-full md:w-[60%] lg:w-[50%] pt-8">
                    {note.eventDescription && (
                      <div className="text-[13px] leading-relaxed prose-sm max-w-none text-black/80">
                        <PortableTextRenderer content={note.eventDescription} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}


      <section id="publications-section" className="bg-[#d9f5b8] w-full flex flex-col md:flex-row p-[20px] min-h-[600px] relative shadow-[0_0_0.8rem_0.8rem_#d9f5b8]">

        {/* Sidebar */}
        <div id="section-sidebar" className="font-oso font-semibold leading-[0.9] relative z-20 text-2xl w-[20%] max-w-[200px] p-2.5 pt-12">
          {/*<Link href="<PublicationsLink />"><p className="md:text-[clamp(1rem,2vw,1.5rem)]">Publications</p></Link>*/}
          <PublicationsLink />

        </div>
        <div id="section-main" className="w-[80%] p-[20px] ml-[20px] flex flex-col justify-center items-center">
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
              <PortableTextRenderer content={aboutPage.columnA} />
            </div>

            {/* Column B */}
            <div id="columnB" className="w-full md:w-[50%] m-[5px]">
              <PortableTextRenderer content={aboutPage.columnB} />
            </div>
          </div>

          {/* Contact info */}
          <div className="w-full text-center pt-[40px] px-[20px]">
            <PortableTextRenderer content={aboutPage.contactInfo} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}