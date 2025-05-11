import { UserProfile } from "@clerk/nextjs";

export default function AccountPage() {
  return (
    <main className="container mx-auto mt-16 max-w-6xl">
      <div className="flex justify-center">
        <UserProfile />
      </div>
    </main>
  );
}
