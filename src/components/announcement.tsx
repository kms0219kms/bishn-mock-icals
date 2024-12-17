export function Announcement({ onClose }: { onClose: () => void }) {
  return (
    <div className="cursor-pointer box-border fixed top-0 left-0 w-full z-50 bg-zinc-100 color text-zinc-800 py-[14px] px-4 text-sm">
      <div className="w-full max-w-[970px] mx-auto text-center px-8">
        <p className="m-0">
          When you export your timetable, we stringly recommend to use
          &quot;Download iCal&quot; button.
          <br />
          <br className="inline lg:hidden" />
          If you have any issues, please contact to me:{" "}
          <a
            href="mailto:minsu_kim@bishanoi.net"
            className="text-blue-700 underline"
          >
            minsu_kim@bishanoi.net
          </a>
          .
        </p>
      </div>

      <button
        type="button"
        className="absolute top-0 right-0 py-[14px] px-4 z-10 text-zinc-800 block"
        onClick={onClose}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
          className="w-5 h-5 inline"
        >
          <path
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>
  );
}
