'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface Page {
  _id: string;
  slug: string;
  title: string;
}

export default function Header({ pages }: { pages: Page[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const pathname = usePathname();
  const showLogoSvg = pathname !== '/'; // show SVG on all pages except homepage

  const handleToggle = () => {
    if (!menuOpen) {
      setIsOpening(true);
      setMenuOpen(true);
    } else {
      setIsOpening(false);
      setMenuOpen(false);
    }
  };

  return (
    <>
      {/* Wrapper to group sticky header + dropdown */}
      <div className="sticky top-0 z-30">
        {/* Header */}
        <header className="bg-[#b6c7d9] shadow-[0_0_0.8rem_0.8rem_#b6c7d9] z-30 p-6 flex items-center justify-between md:sticky md:top-0">
          {/* Logo with optional SVG */}
          <Link href="/">
            <div className="flex items-center gap-2">
                {showLogoSvg && (
                <Image
                  src="/SVG/Arrow_L.svg"
                  alt="Custom SVG"
                  className="h-12 w-12 mr-[20px]"
                  width="45"
                  height="42"
                />
              )}
              <Image
                src="/medupi_logo.png"
                alt="Medupi Logo"
                className="h-13 w-auto"
                width="135"
                height="50"
              />
              
            </div>
          </Link>

          <div className="flex items-center ml-auto relative">
            {/* Burger/Arrow Icon */}
            <button
              onClick={handleToggle}
              className="z-30 w-10 h-10 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <Image
                src={menuOpen ? '/SVG/CarArrow_R.svg' : '/SVG/burger.svg'}
                alt="Menu Icon"
                className={`h-8 w-8 transition-transform duration-300 ${
                  menuOpen ? 'md:rotate-0 -rotate-90' : 'rotate-0'
                }`}
                width="50"
                height="50"
              />
            </button>

            {/* Desktop Menu */}
            <div
              className={`hidden md:flex items-center gap-5 font-oso font-semibold leading-[0.9] text-[1.1rem] font-normal text-sm text-black absolute right-full ${
                menuOpen
                  ? 'opacity-100 translate-x-[-1.5rem]'
                  : 'opacity-0 pointer-events-none translate-x-0'
              } ${isOpening ? 'transition-all duration-300' : ''}`}
            >
              {/* Dynamic pages */}
              {pages.map((page) => (
                <Link
                  key={page._id}
                  href={`/${page.slug}`}
                  className="hover:underline whitespace-nowrap"
                >
                  {page.title}
                </Link>
              ))}

              {/* Fixed additional links */}
              <Link href="/publications" className="hover:underline whitespace-nowrap">
                Publications
              </Link>
              <Link href="/announcements" className="hover:underline whitespace-nowrap">
                Archive
              </Link>
            </div>
          </div>
        </header>

        {/* Mobile Dropdown Menu */}
        <div
          className={`absolute left-0 top-full w-full bg-[#b6c7d9] shadow-[0_0_0.8rem_0.8rem_#b6c7d9] z-40 md:hidden transition-all duration-300 overflow-hidden ${
            menuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-row items-center justify-center p-4 gap-4 font-oso font-semibold leading-[0.9] font-normal text-black text-sm overflow-x-auto">
            {pages.map((page) => (
              <Link
                key={page._id}
                href={`/${page.slug}`}
                onClick={() => setMenuOpen(false)}
                className="hover:underline whitespace-nowrap"
              >
                {page.title}
              </Link>
            ))}
            <Link
              href="/publications"
              onClick={() => setMenuOpen(false)}
              className="hover:underline whitespace-nowrap"
            >
              Publications
            </Link>
            <Link
              href="/announcements"
              onClick={() => setMenuOpen(false)}
              className="hover:underline whitespace-nowrap"
            >
              Archive
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
