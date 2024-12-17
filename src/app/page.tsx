import Image from "next/image";

import { ICalGenerator } from "@/components/ical-generator";

import bishnHorizontal from "@/assets/bishn-horizontal.png";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <Image
        src={bishnHorizontal}
        width={420}
        height={86}
        alt="British International School Hanoi"
      />

      <h1 className="text-2xl font-bold my-8">
        IGCSE Trial Exam Timetable Downloader
      </h1>

      <ICalGenerator />
    </main>
  );
}
