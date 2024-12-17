"use client";

import { useState } from "react";
import Image from "next/image";

import { Announcement } from "@/components/announcement";
import { ICalGenerator } from "@/components/ical-generator";
import { Footer } from "@/components/footer";

import bishnHorizontal from "@/assets/bishn-horizontal.png";

export default function Home() {
  const [announcementOpen, setAnnouncementOpen] = useState(true);

  return (
    <>
      {announcementOpen && (
        <Announcement
          onClose={() => {
            setAnnouncementOpen(false);
          }}
        />
      )}

      <main
        className={`container mx-auto px-4 ${
          announcementOpen ? "pt-[68px]" : ""
        }`}
      >
        <Image
          src={bishnHorizontal}
          width={384}
          height={78}
          alt="British International School Hanoi"
          className="w-72 lg:w-96 py-5"
        />

        <h1 className="inline-flex flex-col gap-1 lg:flex-row lg:gap-0 text-2xl font-bold mt-8 mb-5">
          <span>IGCSE Trial Exam Timetable</span>
          <span className="hidden lg:inline">&nbsp;-&nbsp;</span>
          <span>iCals Downloader</span>
        </h1>

        <ICalGenerator />

        <Footer />
      </main>
    </>
  );
}
