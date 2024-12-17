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
import { ToastAction } from "@/components/ui/toast";

import { useToast } from "@/hooks/use-toast";
import { generateICalFile } from "@/app/actions";

import type { IExam } from "@/types/IExam";

export function ICalGenerator() {
  const { toast } = useToast();

  const [timetable, setTimetable] = useState<IExam[]>([]);
  const [iCalData, setICalData] = useState<string>("");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number[]>([]);

  useEffect(() => {
    fetch("/api/timetable")
      .then((response) => response.json())
      .then((data) => setTimetable(data.data))
      .catch((error) => console.error("Error loading timetable:", error));
  }, []);

  const getIcalFileFromServer = async () => {
    const response = await generateICalFile(value);

    if (response) {
      setICalData(response.toString());
      return response;
    } else {
      toast({
        variant: "destructive",
        title: "Failed to generate iCal file.",
        description: "Please try again later, or contact Minsu for assistance.",
        action: (
          <ToastAction
            altText="Contact"
            onClick={() => {
              window.open(
                "mailto:minsu_kim@bishanoi.net?subject=Failed to generate iCal file",
                "_self"
              );
            }}
          >
            Contact
          </ToastAction>
        ),
      });
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
    toast({
      variant: "default",
      title: "iCal link copied to clipboard.",
      description: "You can now paste it to your calendar app, i.e. Outlook.",
    });
  };

  return (
    <div className="space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-96 justify-between"
          >
            Select subjects...
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-96 p-0">
          <Command>
            <CommandInput placeholder="Search subjects..." />
            <CommandList>
              <CommandEmpty>No subjects found.</CommandEmpty>
              <CommandGroup>
                {timetable
                  .sort((x, y) =>
                    `${x.subject} - ${x.paperType}`.localeCompare(
                      `${y.subject} - ${y.paperType}`
                    )
                  )
                  .map((exam) => (
                    <CommandItem
                      key={exam.id}
                      value={exam.subject + " - " + exam.paperType}
                      onSelect={(currentValue) => {
                        const currentExam = timetable.find(
                          (e) =>
                            e.subject + " - " + e.paperType === currentValue
                        );

                        setValue(
                          (value.includes(currentExam!.id)
                            ? value.filter((v) => v !== currentExam!.id)
                            : [...value, currentExam!.id]
                          ).sort((x, y) => x - y)
                        );
                        setICalData("");
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value.includes(exam.id) ? "opacity-100" : "opacity-0"
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

      {value.length > 0 && (
        <div className="pt-5">
          <h2 className="text-xl font-semibold mb-2">
            Subject selected by you:
          </h2>

          <ul className="list-disc pl-5">
            {timetable
              .filter((exam) => value.includes(exam.id))
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

      <div className="flex space-x-2 pt-5">
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

      {value.length > 0 && (
        <div className="pt-5">
          <Label htmlFor="icalLink">iCal Link</Label>

          <Input
            id="icalLink"
            value={(() => {
              const url = new URL(location.origin);
              url.pathname = "/api/ical";
              url.searchParams.set(
                "exams",
                value.sort((x, y) => x - y).join(",")
              );

              return url.toString();
            })()}
            readOnly
          />
        </div>
      )}
    </div>
  );
}
