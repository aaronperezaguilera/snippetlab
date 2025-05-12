import { currentUser } from "@clerk/nextjs/server";
import HomePage from "./home/page";
import { Feed } from "@/components/feed";

export default async function Home() {
  const user = await currentUser();
  if (!user) {
    return <HomePage />;
  }
  return (
    <main className="mt-16 grid grid-cols-[1fr_3fr_1fr] gap-16 relative">
      <h1 className="text-6xl font-bold text-balance">
        Welcome back, {user.firstName}
      </h1>
      <section>
        <Feed />
      </section>
    </main>
  );
}
