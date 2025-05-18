import { SnippetsWidget } from "@/components/snippets-widget";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mt-16 grid grid-cols-[1.2fr_2.8fr_1.2fr] gap-16 relative min-h-screen">
      <SnippetsWidget />
      {children}
    </main>
  );
}
