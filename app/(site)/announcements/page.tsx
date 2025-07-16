import { getAnnouncements } from '@/sanity/sanity-utils';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import EventBlock from '@/components/EventDropdown';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default async function AnnouncementsPage() {
    const announcements = await getAnnouncements();

    const now = new Date();

    // You may want to include past announcements too, so just sort all by validUntil or created date
    const sortedAnnouncements = announcements
        .slice()
        .sort((a, b) => {
            const dateA = new Date(a.validUntil || a._createdAt);
            const dateB = new Date(b.validUntil || b._createdAt);
            return dateB.getTime() - dateA.getTime();
        });

    return (
        <div>
        <section
            id="announcements-section"
            className="bg-[#F5C3C0] w-full flex flex-col md:flex-row p-[20px] min-h-[400px] relative shadow-[0_0_0.8rem_0.8rem_#F5C3C0]"
        >
            {/* Sidebar */}
            <div
                id="section-sidebar"
                className="font-oso font-semibold leading-[0.9] relative z-20 text-2xl w-[20%] max-w-[200px] p-2.5 pt-12"
            >
                <Link href="/announcements">
                    <p className="md:text-[clamp(1rem,2vw,1.5rem)]">Announcements Archive</p>
                </Link>
            </div>

            {/* Main Content */}
            <div
                id="section-main"
                className="items-center flex flex-col p-5 pb-15 w-full md:w-[80%]"
            >
                <div
                    id="announcements-container"
                    className="justify-left flex flex-col md:flex-row w-full max-w-screen-xl"
                >
                    {/* Column A */}
                    <div id="announcements-columnA" className="md:w-1/2">
                        {sortedAnnouncements.map((announcement) => (
                            <div key={announcement._id}>
                                <h2 className="text-[clamp(1.5em,4vw,3em)] py-7">
                                    {announcement.title}
                                </h2>

                                {announcement.images?.map((img, i) => (
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

                                        {announcement.captions?.[i] && (
                                            <div
                                                id="image-caption"
                                                className="w-full text-left italic mt-[10px] mb-[30px]"
                                            >
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
                    <img
                        id="vert-divider"
                        className="hidden md:block py-[50px] mt-[100px] ml-[80px] w-[5%] max-h-[650px]"
                        src="/SVG/line_vert.svg"
                        alt="Vertical Divider"
                    />
                    <img
                        id="horiz-divider"
                        className="block md:hidden py-[50px] mx-auto my-4 w-full max-w-[650px] h-auto"
                        src="/SVG/line_horiz.svg"
                        alt=""
                        aria-hidden="true"
                        role="presentation"
                    />

                    {/* Column B: Dates */}
                    <div id="announcements-columnB" className="w-full md:w-[30%] p-[30px]">
                        <div id="Dates">
                            <h2 className="text-center">Dates:</h2>
                            {sortedAnnouncements.map((announcement) => (
                                <div key={announcement._id}>
                                    {(() => {
                                        const upcoming = announcement.eventDates
                                            ?.filter((e) => new Date(e.date) >= now)
                                            .sort(
                                                (a, b) =>
                                                    new Date(a.date).getTime() - new Date(b.date).getTime()
                                            );

                                        const past = announcement.eventDates
                                            ?.filter((e) => new Date(e.date) < now)
                                            .sort(
                                                (a, b) =>
                                                    new Date(a.date).getTime() - new Date(b.date).getTime()
                                            );

                                        const sortedEvents = [...(upcoming || []), ...(past || [])];

                                        return sortedEvents.map((event, i) => {
                                            const isPast = new Date(event.date) < now;

                                            return (
                                                <div
                                                    key={i}
                                                    className={`mb-4 transition-all duration-300 ${isPast ? 'opacity-50 grayscale' : ''
                                                        }`}
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
        <Footer />
        </div>
    );
}
