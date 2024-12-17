export const dynamic = "force-static";

export async function GET() {
  const data = await import("@/data/timetable.json");

  return Response.json({
    code: "OPERATION_COMPLETE",
    status: 200,
    data: data.exams,
    responseAt: new Date().toISOString(),
  });
}
