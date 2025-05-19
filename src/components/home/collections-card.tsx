import { CollectionCard } from "../collection-card";

export function CollectionsCard() {
  return (
    <article className="border flex flex-col gap-8 col-span-4 rounded-sm overflow-hidden">
      <div className="flex flex-col justify-center gap-4 p-8">
        <h3 className="text-2xl">Organize into Collections</h3>
        <p className="max-w-[60ch] text-muted-foreground text-pretty">
          Group your snippets in public or private collections. Create thematic
          folders (API Helpers, UI Components...) and keep your code library
          perfectly organized and accessible.
        </p>
      </div>
      <div className="aspect-video pointer-events-none p-8 overflow-hidden flex flex-col gap-4 relative">
        <CollectionCard
          collection={{
            id: 1,
            slug: "demo-collection",
            title: "React Hooks",
            description: "A collection of useful React hooks",
            visibility: "public",
            pinned: false,
            createdAt: new Date(),
            userId: "demo-author",
          }}
          author={{
            id: "demo-author",
            username: "janedoe",
            first_name: "Jane",
            last_name: "Doe",
            image_url: "/jane.webp",
            bio: "Demo user for snippetforge",
            website: "https://example.com",
            github: "janedoe",
            x: "@janedoe",
            createdAt: new Date(),
            updatedAt: null,
          }}
        />
        <CollectionCard
          collection={{
            id: 2,
            slug: "js-utilities",
            title: "JS Utilities",
            description: "Handy JavaScript helper functions",
            visibility: "public",
            pinned: true,
            createdAt: new Date(),
            userId: "demo-author",
          }}
          author={{
            id: "demo-author",
            username: "janedoe",
            first_name: "Jane",
            last_name: "Doe",
            image_url: "/jane.webp",
            bio: "Demo user for snippetforge",
            website: "https://example.com",
            github: "janedoe",
            x: "@janedoe",
            createdAt: new Date(),
            updatedAt: null,
          }}
        />

        <CollectionCard
          collection={{
            id: 3,
            slug: "python-snippets",
            title: "Python Snippets",
            description: "Quick Python recipes for common tasks",
            visibility: "public",
            pinned: false,
            createdAt: new Date(),
            userId: "demo-author",
          }}
          author={{
            id: "demo-author",
            username: "janedoe",
            first_name: "Jane",
            last_name: "Doe",
            image_url: "/jane.webp",
            bio: "Demo user for snippetforge",
            website: "https://example.com",
            github: "janedoe",
            x: "@janedoe",
            createdAt: new Date(),
            updatedAt: null,
          }}
        />
        <div className="absolute top-0 left-0 bg-gradient-to-t from-background to-transparent w-full h-full"></div>
      </div>
    </article>
  );
}
