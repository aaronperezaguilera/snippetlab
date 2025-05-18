import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <main className="container mx-auto mt-16 max-w-6xl min-h-screen flex items-start justify-center">
      <Loader2 className="animate-spin w-12 h-12" />
    </main>
  );
}
