import { getNotes } from '@/sanity/sanity-utils';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import PortableTextRenderer from "@/components/PortableTextRenderer";
import NotesPdfClient from '@/components/NotesPdfClient';

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
                <div className="font-oso font-semibold leading-[0.9] relative z-20 text-2xl w-[20%] max-w-[200px] p-2.5 pt-12">
                    <Link href="/notes">
                        <p className="md:text-[clamp(1rem,2vw,1.5rem)]">Notes Archive</p>
                    </Link>
                </div>

                {/* Main Content */}
                <div className="flex flex-col p-5 w-full md:w-[80%] max-w-screen-xl">
                    {sortedNotes.map((note, noteIndex) => {
                        const noteDate = new Date(note.validUntil || note._createdAt).toLocaleDateString('en-GB', {
                            month: 'long',
                            year: 'numeric'
                        });

                        return (
                            <div key={note._id} className="w-full">
                                
                                {/* 1. Separator & Date (Only show between items) */}
                                {noteIndex > 0 && (
                                    <div className="w-full flex flex-col items-center my-16">
                                        <span className="mb-4 font-oso text-sm uppercase tracking-widest opacity-60">
                                            {noteDate}
                                        </span>
                                        <div className="w-full max-w-6xl border-t-2 border-black border-dashed opacity-30"></div>
                                    </div>
                                )}

                                {/* 2. Individual Note Content */}
                                <div className="mb-32 flex flex-col items-center">

                                    {/* Title: Fully Centered */}
                                    <div className="w-full flex justify-center">
                                        <div className="w-full max-w-screen-xl px-5 text-center">
                                            <h2 className="text-[clamp(1.5em,4vw,3em)] py-7">
                                                {note.title}
                                            </h2>
                                        </div>
                                    </div>

                                    {/* Centered Media Row (Image + PDF) */}
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
                                                            width={1200}
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
                            </div>
                        );
                    })}
                </div>
            </section>
            <Footer />
        </div>
    );
}