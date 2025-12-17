import { getNotes } from '@/sanity/sanity-utils';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import PortableTextRenderer from "@/components/PortableTextRenderer";
import NotesPdfClient from '@/components/NotesPdfClient'; // Added this import

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function NotesPage() {
    const notes = await getNotes();

    // Sort notes by validUntil date - most recently valid first
    const sortedNotes = notes
        .slice()
        .sort((a, b) => {
            const dateA = new Date(a.validUntil || a._createdAt);
            const dateB = new Date(b.validUntil || b._createdAt);
            return dateB.getTime() - dateA.getTime();
        });

    return (
        <div id="content" className="flex flex-col min-h-screen">
            <section
                id="notes-section"
                className="bg-[#ffb347] w-full flex flex-col md:flex-row p-[20px] min-h-[400px] relative shadow-[0_0_0.8rem_0.8rem_#ffb347]"
            >
                {/* Sidebar */}
                <div
                    className="font-oso font-semibold leading-[0.9] relative z-20 text-2xl w-[20%] max-w-[200px] p-2.5 pt-12"
                >
                    <Link href="/notes">
                        <p className="md:text-[clamp(1rem,2vw,1.5rem)]">Notes Archive</p>
                    </Link>
                </div>

                {/* Main Content */}
                <div className="flex flex-col p-5 w-full md:w-[80%] max-w-screen-xl">
                    {sortedNotes.map((note, noteIndex) => {
                        // Format the date (e.g., "October 2025")
                        const noteDate = new Date(note.validUntil || note._createdAt).toLocaleDateString('en-GB', {
                            month: 'long',
                            year: 'numeric'
                        });

                        return (
                            <div key={note._id} className="w-full">

                                {/* 1. Separator & Date - only show if not the first note */}
                                {noteIndex > 0 && (
                                    <div className="w-full flex flex-col items-start my-16">
                                        {/* The Date Label */}
                                        <span className="mb-4 font-oso text-sm uppercase tracking-widest opacity-60">
                                            {noteDate}
                                        </span>
                                        {/* The Dashed Line */}
                                        <div className="w-full max-w-6xl border-t-2 border-black border-dashed opacity-30"></div>
                                    </div>
                                )}

                                {/* 2. Individual Note Content (Centered Layout) */}
                                <div className="mb-32 flex flex-col items-center">

                                    {/* Title */}
                                    <div className="w-full flex justify-">
                                        <div className="w-full max-w-screen-xl px-5 text-center">
                                            <h2 className="text-[clamp(1.5em,4vw,3em)] py-7">
                                                {note.title}
                                            </h2>
                                        </div>
                                    </div>

                                    {/* Media Row (Image + PDF) with the new 995px breakpoint */}
                                    <div className="w-full flex justify-center">
                                        <div className="flex flex-col min-[995px]:flex-row gap-5 items-center min-[995px]:items-start px-5 overflow-x-auto pb-4">

                                            {/* Image */}
                                            <div className="w-fit flex flex-col">
                                                {note.images?.[0] && (
                                                    <>
                                                        <Image
                                                            src={note.images[0]}
                                                            alt={note.captions?.[0] || "Note Image"}
                                                            width={800}
                                                            height={1131}
                                                            className="w-auto h-[60vh] max-w-full object-contain shadow-sm border border-black/5"
                                                            priority
                                                        />
                                                        {note.captions?.[0] && (
                                                            <p className="mt-3 text-[13px] italic font-light lowercase leading-tight max-w-full">
                                                                {note.captions[0]}
                                                            </p>
                                                        )}
                                                    </>
                                                )}
                                            </div>

                                            {/* PDF */}
                                            <div className="w-fit">
                                                {note.pdf?.asset?.url && (
                                                    <NotesPdfClient url={note.pdf.asset.url} title={note.title} />
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
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
                            </div>
                        );
                    })}
                </div>
            </section>
            <Footer />
        </div>
    );
}