import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex flex-col gap-4 p-4 bg-popover border-t">
      <div className="flex justify-center items-center flex-col gap-4 text-center">
        <h6>
          Project made for{" "}
          <a
            href="https://github.com/midudev/hackaton-clerk-2025"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Midudev & Clerk Hackaton 2025
          </a>
        </h6>
        <p>
          Made with ❤️ by{" "}
          <a
            href="https://dotmd.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Aaron
          </a>
        </p>
      </div>
    </footer>
  );
}
