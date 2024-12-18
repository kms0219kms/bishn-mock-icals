export function Footer() {
  return (
    <div className="pt-16 text-sm text-center text-zinc-500">
      <p>
        Guide Video: How to import the iCal file to Outlook?
        <br className="inline md:hidden" />
        <a
          href="https://watch.screencastify.com/v/GLVobqbAjbG3095JucDn"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 underline"
        >
          &lt;Windows&gt;
        </a>
        {", "}
        <a
          href="https://watch.screencastify.com/v/Bq1hUfGec9kTlc9RYzdL"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 underline"
        >
          &lt;macOS/Webapp&gt;
        </a>
      </p>

      <br />

      <p>
        If any exam timetable has been changed,
        <br className="inline md:hidden" />
        this tool has{" "}
        <span className="font-semibold text-zinc-900">
          no responsibility
        </span>{" "}
        for the update.
      </p>

      <br className="inline md:hidden" />

      <p>
        Made with ❤️ by{" "}
        <a
          href="https://devayaan.me"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 underline"
        >
          Minsu Kim
        </a>{" "}
        with Next.js and Tailwind CSS.
      </p>
    </div>
  );
}
