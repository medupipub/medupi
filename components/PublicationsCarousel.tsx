'use client'

import { useEffect, useRef, useState } from 'react'
import Glide from '@glidejs/glide'
import { Publication } from '@/types/Publication'
import Link from 'next/link';
import Image from 'next/image'

type Props = {
    publications: Publication[]
}

export default function PublicationCarousel({ publications }: Props) {
    const glideRef = useRef<HTMLDivElement | null>(null)
    const [glideMounted, setGlideMounted] = useState(false)

    useEffect(() => {
        if (!glideRef.current || publications.length === 0) return

        const glide = new Glide(glideRef.current, {
            type: 'carousel',
            perView: 3,
            focusAt: 'center',
            gap: 24,
            breakpoints: {
                1024: { perView: 1 },
                640: { perView: 1 },
            },
        })

        glide.mount()
        setGlideMounted(true)

        return () => {
            glide.destroy()
            setGlideMounted(false)
        }
    }, [publications])

    if (!publications || publications.length === 0) return null

    return (
        <div className="w-full max-w-[1200px] mx-auto">
            <div ref={glideRef} className="glide relative w-full overflow-visible">
                {/* Track and Slides */}
                <div className="glide__track" data-glide-el="track">
                    <ul className="glide__slides flex justify-center items-center">
                        {publications.map((pub) => (
                            <li
                                key={pub._id}
                                className="glide__slide flex justify-center items-center px-2 sm:px-4"
                            >
                                <Link
                                    href={`/publications/${pub.slug}`}
                                    className="block text-center group w-full max-w-[250px] sm:max-w-[280px] md:max-w-[300px]"
                                >
                                    <div className="w-full h-[300px] flex justify-center items-center overflow-hidden">
                                        <Image
                                            src={pub.frontcover ?? '/assets/default_cover.jpg'}
                                            alt={pub.alt ?? pub.title}
                                            width={250}
                                            height={300}
                                            className="w-auto h-full object-contain"
                                        />
                                    </div>
                                    <div className="mt-2 text-center text-sm leading-snug">
                                        <h3
                                            className="font-oso w-full text-[1.1rem] font-normal text-black mt-5"
                                            dangerouslySetInnerHTML={{
                                                __html: pub.title
                                                    .replace(/~~(.*?)~~/g, '<s>$1</s>')
                                                    .replace(/\\n/g, '<br />'),
                                            }}
                                        />
                                        {pub.author && (
                                            <p className="pt-1 font-oso text-[0.9rem] italic">{pub.author}</p>
                                        )}
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Navigation Arrows - Responsive positioning */}
                <div className="glide__arrows" data-glide-el="controls">
                    <button
                        className="glide__arrow glide__arrow--left absolute top-1/2 transform -translate-y-1/2 z-10
                                   left-[-30px] md:left-[-32px]
                                   disabled:opacity-50"
                        data-glide-dir="<"
                        disabled={!glideMounted}
                    >
                        <Image
                            src="/SVG/CarArrow_L.svg"
                            alt="Previous"
                            className="w-8 h-8 md:w-11 md:h-11"
                            width={32}
                            height={32}
                        />
                    </button>
                    <button
                        className="glide__arrow glide__arrow--right absolute top-1/2 transform -translate-y-1/2 z-10
                                   right-[-50px] md:right-[-32px]
                                   disabled:opacity-50"
                        data-glide-dir=">"
                        disabled={!glideMounted}
                    >
                        <Image
                            src="/SVG/CarArrow_R.svg"
                            alt="Next"
                            className="w-8 h-8 md:w-11 md:h-11"
                            width={32}
                            height={32}
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}