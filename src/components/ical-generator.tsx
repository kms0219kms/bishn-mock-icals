"use client";

import { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { generateICalFile } from "@/app/actions";
import type { IExam } from "@/types/IExam";

export function ICalGenerator() {
  const [timetable, setTimetable] = useState<IExam[]>([]);
  const [iCalData, setICalData] = useState<string>("");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/timetable")
      .then((response) => response.json())
      .then((data) => setTimetable(data.data))
      .catch((error) => console.error("Error loading timetable:", error));
  }, []);

  const getIcalFileFromServer = async () => {
    const response = await generateICalFile(value.map((v) => parseInt(v)));

    if (response) {
      setICalData(response.toString());
      return response;
    } else {
      alert("Failed to generate iCal file.");
    }
  };

  const handleDownload = async () => {
    const file = iCalData || (await getIcalFileFromServer());

    const blob = new Blob([file!], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "exam-timetable.ics";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const getIcalApiLink = () => {
    const url = new URL(location.origin);
    url.pathname = "/api/ical";
    url.searchParams.set("exams", value.join(","));

    return url.toString();
  };

  const handleExportToOutlook = async () => {
    window.open(
      getIcalApiLink().replace("https", "http").replace("http", "webcal")
    );
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getIcalApiLink());
    alert("iCal link copied to clipboard.");
  };

  return (
    <div className="space-y-4">
      {value.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">
            Subject selected by you:
          </h2>

          <ul className="list-disc pl-5">
            {timetable
              .filter((exam) => value.includes(String(exam.id)))
              .sort((x, y) => x.id - y.id)
              .map((exam, index) => (
                <li key={index}>
                  {exam.subject} - {exam.paperType} on {exam.date} at{" "}
                  {exam.startTime} ({exam.duration} minutes)
                </li>
              ))}
          </ul>
        </div>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[450px] justify-between"
          >
            Select subjects...
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[450px] p-0">
          <Command>
            <CommandInput placeholder="Search subjects..." />
            <CommandList>
              <CommandEmpty>No subjects found.</CommandEmpty>
              <CommandGroup>
                {timetable.map((exam) => (
                  <CommandItem
                    key={exam.id}
                    value={exam.id.toString()}
                    onSelect={(currentValue) => {
                      setValue(
                        value.includes(currentValue)
                          ? value.filter((v) => v !== currentValue)
                          : [...value, currentValue]
                      );
                      setICalData("");
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value.includes(exam.id.toString())
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {exam.subject + " - " + exam.paperType}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="flex space-x-2">
        <Button onClick={handleDownload} disabled={value.length <= 0}>
          Download iCal
        </Button>

        <Button onClick={handleExportToOutlook} disabled={value.length <= 0}>
          Export to Outlook
        </Button>

        <Button onClick={handleCopyLink} disabled={value.length <= 0}>
          Copy iCal Link
        </Button>
      </div>

      {iCalData && (
        <div className="mt-4">
          <Label htmlFor="icalLink">iCal Link</Label>

          <Input
            id="icalLink"
            value={(() => {
              const url = new URL(location.origin);
              url.pathname = "/api/ical";
              url.searchParams.set("exams", value.join(","));

              return url.toString();
            })()}
            readOnly
          />
        </div>
      )}
    </div>
  );
}
