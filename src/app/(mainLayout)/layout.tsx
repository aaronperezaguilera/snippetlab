import { SnippetsWidget } from "@/components/snippets-widget";
import { currentUser } from "@clerk/nextjs/server";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user) {
    return children;
  }
  return (
    <main className="grid grid-cols-[1.2fr_2.8fr_1.2fr] gap-8 relative min-h-screen">
      <div className="bg-popover border-r">
        <SnippetsWidget />
      </div>
      {children}
    </main>
  );
}
