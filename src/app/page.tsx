import { currentUser } from "@clerk/nextjs/server";
import HomePage from "./home/page";

export default async function Home() {
  const user = await currentUser();
  if (!user) {
    return <HomePage />;
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold text-balance">
        Welcome back, {user.firstName}
      </h1>
    </main>
  );
}
