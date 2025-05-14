import { currentUser } from "@clerk/nextjs/server";
import { getFeaturedUsers } from "@/db";
import { Author } from "./author";

export async function FeaturedUsers() {
  const user = await currentUser();
  if (!user) {
    return <div>Please log in to see featured users.</div>;
  }

  const featuredUsers = await getFeaturedUsers(user.id);

  if (featuredUsers.length === 0) return;

  return (
    <section className="flex flex-col gap-4 pr-16">
      <h2 className="text-xl font-bold">Featured users</h2>
      <div className="flex flex-col gap-2">
        {featuredUsers.map(({ user }) => (
          <Author author={user} key={user.id} clasName="w-full justify-start" />
        ))}
      </div>
    </section>
  );
}
