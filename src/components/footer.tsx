export function Footer() {
  return (
    <footer className="flex flex-col gap-4 p-4 bg-gray-800 text-white mt-16">
      <div className="flex justify-between">
        <p>&copy; 2023 Your Company</p>
        <div className="flex gap-4">
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:underline">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
