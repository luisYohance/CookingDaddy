import Image from "next/image";
import { auth } from "@/lib/auth/server";
import { LogOutMenuLink } from "./logout";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default async function NavBar() {
  const { data: session } = await auth.getSession();

  return (
    <div
      className="px-5 pr-[4rem] flex items-center justify-between bg-background border-b-4 border-foreground"
      id="navbar"
    >
      <div className="flex items-center gap-2" id="branding">
        {session ? (
          <img
            className="h-14 w-14 min-h-14 min-w-14 md:h-20 md:w-20 p-1 md:p-2 flex-shrink-0"
            src="/assets/logo.svg"
            alt="Logo"
          />
        ) : null}
        <h1 className="text-2xl md:text-[3rem] hidden md:block">
          CookingDaddy
        </h1>
      </div>

      <NavigationMenu>
        {session ? (
          <NavigationMenuList className="gap-3 md:gap-6">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-base md:text-2xl">
                My Account
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="/settings">
                  Settings
                </NavigationMenuLink>
                <NavigationMenuLink href="/friends">
                  My Friends
                </NavigationMenuLink>
                <NavigationMenuLink href="/my-recipes">
                  My Recipes
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className="text-base md:text-2xl"
                href="/recipes"
              >
                Browse Recipes
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <LogOutMenuLink />
            </NavigationMenuItem>
          </NavigationMenuList>
        ) : (
          <NavigationMenuList className="gap-3 md:gap-6">
            <NavigationMenuItem>
              <NavigationMenuLink
                className="text-base md:text-2xl"
                href="/auth/sign-in"
              >
                Log In
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className="text-base md:text-2xl"
                href="/auth/sign-up"
              >
                Register
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        )}
      </NavigationMenu>

      {/* <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Link</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu> */}
    </div>
  );
}
