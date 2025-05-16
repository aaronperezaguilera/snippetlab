import { Profile } from "@/components/profile";
import { ProfileNav } from "@/components/profile-nav";

export default async function ProfileLayout({
  params,
  children,
}: {
  params: Promise<{ username: string }>;
  children: React.ReactNode;
}) {
  const { username } = await params;
  return (
    <main className="container mx-auto flex flex-col gap-16 mt-16 min-h-screen">
      <Profile username={username} />
      <div className="flex flex-col gap-4">
        <ProfileNav username={username} />
        {children}
      </div>
    </main>
  );
}
