"use server";

import ical, { ICalCalendarMethod } from "ical-generator";

import type { IExam } from "@/types/IExam";
import * as examTimetable from "@/data/timetable.json";

export async function generateICalFile(timetableIds: number[]) {
  console.log("Generating iCal file for timetable IDs:", timetableIds);

  const calendar = ical({
    name: "Trial Exam Timetable",
    method: ICalCalendarMethod.REQUEST,
  });

  const exams = JSON.parse(JSON.stringify(examTimetable.exams)) as IExam[];
  const timetable = exams.filter((exam) =>
    timetableIds.includes(exam.id)
  ) as IExam[];

  if (timetable.length === 0) {
    return null;
  }

  timetable.forEach((exam) => {
    const startDate = new Date(`${exam.date}T${exam.startTime}+07:00`);
    const endDate = new Date(startDate.getTime() + exam.duration * 60000);

    calendar.createEvent({
      start: startDate,
      end: endDate,
      summary: `${exam.subject} - ${exam.paperType}`,
      description: `Trial exam for ${exam.subject} - ${exam.paperType}`,
      location: exam.location,
    });
  });

  return calendar.toString();
}
