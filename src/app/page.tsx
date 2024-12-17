import Image from "next/image";

import { ICalGenerator } from "@/components/ical-generator";

import bishnHorizontal from "@/assets/bishn-horizontal.png";

export default function Home() {
  return (
    <main className="container mx-auto px-4">
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

      <div className="pt-16 text-sm text-center text-zinc-500">
        <p>
          If any exam timetable has been changed, this tool has{" "}
          <span className="font-semibold text-zinc-900">no responsibility</span>{" "}
          for the update.
        </p>

        <p>
          Made with ❤️ by{" "}
          <a
            href="https://devayaan.me"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Minsu
          </a>{" "}
          with Next.js and Tailwind CSS.
        </p>
      </div>
    </main>
  );
}
