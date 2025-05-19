import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex flex-col gap-4 p-4 bg-gray-800 text-white">
      <div className="flex justify-between">
        <p>&copy; 2023 Your Company</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
