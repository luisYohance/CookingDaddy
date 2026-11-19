import NavBar from "@/components/ui/navbar.tsx";
import { auth } from "@/lib/auth/server";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
// Server components using auth methods must be rendered dynamically
export const instant = false;

export default async function Home() {
  const { data: session } = await auth.getSession();
  return (
    <div>
      <NavBar />
      {session ? (
        <div>
          <div
            id="banner"
            className="bg-foreground max-w-screen text-white mt-6 gap-6 p-6 flex items-center justify-start"
          >
            <Avatar className="size-30 md:size-60 shrink-0">
              <AvatarImage src={session.user.image} alt={session.user.name} />
              <AvatarFallback className="text-6xl md:text-8xl">
                {session.user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-base md:text-lg text-muted-foreground">
                Let's get cookin',
              </h1>
              <h1 className="text-6xl md:text-8xl font-semibold truncate">
                {session.user.name}
              </h1>
            </div>
          </div>
          <div className="flex my-4 items-end justify-around">
            <h1 className="text-4xl md:text-6xl">Your Recipes</h1>
            <Link href="/create-recipe">
              <u>Create your own recipe</u>
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
