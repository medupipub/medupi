'use client';

import { useState } from 'react';
import Image from 'next/image';
import { EventDate } from '@/types/Announcement';


type Props = {
  event: EventDate;
};

export default function EventBlock({ event }: Props) {
  const [open, setOpen] = useState(false);

    return (
        <div id="event-block">
            <div
                id="event-header"
                className="flex flex-col m-[30px] text-center text-[1rem] sm:text-[1.1rem] md:text-[1.2rem]"
            >
                <div
                    id="event-holder"
                    className="flex flex-col justify-center items-center w-full"
                >
                    <div className="font-oso font-semibold leading-[0.9] text-center relative z-20 m-[10px]">
                        <h3 className="m-[10px]">
                            {new Date(event.date).toLocaleDateString('en-GB', {
                                weekday: 'short',
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                            }).replace(',', '')}
                        </h3>
                        <h3 className="m-[10px]">{event.venue}</h3>
                        <h3 className="m-[10px]">{event.address}</h3>
                    </div>

                    {/* Only show icon above when collapsed */}
                    {!open && (
                        <div
                            id="dropdown-icon-container"
                            className="pointer-events-auto cursor-pointer flex justify-center items-center"
                            onClick={() => setOpen(true)}
                        >
                            <Image
                                id="dropdown-icon"
                                className={`w-[1.5em] h-auto transition-transform duration-300 ease-in-out ${
                                    open ? 'rotate-180' : 'rotate-0'
                                }`}
                                src="/SVG/droparrow_D03.svg"
                                alt="Dropdown"
                                width="20"
                                height="20"
                            />
                        </div>
                    )}

                    {/* Schedule section */}
                    <div
                        id="schedule"
                        className={`${
                            open ? 'block' : 'hidden'
                        } transition-all duration-300 ease-in-out`}
                    >
                        <div>{event.time}</div>
                        <br />
                        <div>{event.description}</div>
                    </div>

                    {/* Only show icon below when expanded */}
                    {open && (
                        <div
                            id="dropdown-icon-container"
                            className="pointer-events-auto cursor-pointer flex justify-center items-center mt-2"
                            onClick={() => setOpen(false)}
                        >
                            <Image
                                id="dropdown-icon"
                                className={`w-[1.5em] h-auto transition-transform duration-300 ease-in-out ${
                                    open ? 'rotate-180' : 'rotate-0'
                                }`}
                                src="/SVG/droparrow_D03.svg"
                                alt="Dropdown"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
