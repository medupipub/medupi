"use client";

import { useEffect } from "react";
import Glide from "@glidejs/glide";
import styles from "./PublicationsCarousel.module.css";
import { Publication } from "@/types/Publication";

type Props = {
    publications: Publication[];
};

export default function PublicationsCarouselClient({ publications }: Props) {
    useEffect(() => {
        const glide = new Glide(".glide", {
            type: "carousel",
            perView: window.innerWidth < 768 ? 1 : 3,
            focusAt: "center",
            gap: 20,
            breakpoints: {
                768: {
                    perView: 1,
                    gap: 10,
                },
            },
        });
        glide.mount();
    }, []);

    return (
        <div className="glide">
            {/* Slides Wrapper */}
            <div className="glide__track" data-glide-el="track">
                <ul className="glide__slides" id="glide-wrapper">
                    {publications.map((pub) => (
                        <li key={pub._id} className="glide__slide">
                            <a href={`/publications/${pub.slug}`} className={styles.carouselItem}>
                                <div className={styles.imgWrapper}>
                                    <img
                                        src={pub.frontcover || "/assets/default_cover.jpg"}
                                        alt={pub.alt || pub.title}
                                        className={styles.carouselImg}
                                    />
                                </div>
                                <div className={styles.caption}>
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: pub.title.replace(/\n/g, "<br>"),
                                        }}
                                    />
                                    {pub.author && (
                                        <div className={styles.authorText}>
                                            <em>{pub.author}</em>
                                        </div>
                                    )}
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Arrows */}
            <div className="glide__arrows" data-glide-el="controls">
                <button className="glide__arrow glide__arrow--left" data-glide-dir="<">
                    <img src="/assets/SVG/CarArrow_L.svg" alt="Previous" />
                </button>
                <button className="glide__arrow glide__arrow--right" data-glide-dir=">">
                    <img src="/assets/SVG/CarArrow_R.svg" alt="Next" />
                </button>
            </div>
        </div>
    );
}
