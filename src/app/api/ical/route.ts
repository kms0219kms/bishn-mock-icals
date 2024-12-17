import { type NextRequest } from "next/server";

import { generateICalFile } from "@/app/actions";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const exams =
    (searchParams.get("exams")
      ? searchParams.get("exams")?.split(",").map(Number)
      : undefined) || [];

  if (exams.length === 0) {
    return new Response(
      JSON.stringify({
        code: "BAD_REQUEST",
        status: 400,
        message: '"exams" parameter is required.',
        data: null,
        responseAt: new Date().toISOString(),
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const ical = await generateICalFile(exams);

  if (!ical) {
    return new Response(
      JSON.stringify({
        code: "NOT_FOUND",
        status: 404,
        message: "No exams found with the given IDs.",
        data: null,
        responseAt: new Date().toISOString(),
      }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(ical, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="exam-timetable.ics"',
    },
  });
}
