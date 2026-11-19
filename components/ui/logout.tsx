"use client";

import { authClient } from "@/lib/auth/client";
import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function LogOutMenuLink() {
  const [buffer, setBuffer] = useState(false);
  const router = useRouter();
  async function logOut() {
    setBuffer(true);
    try {
      await authClient.signOut();
    } finally {
      router.push(".");
      setBuffer(false);
    }
  }
  return (
    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
      <button
        type="button"
        onClick={logOut}
        disabled={buffer}
        className="cursor-pointer text-base md:text-2xl"
      >
        {buffer ? "Logging out..." : "Log Out"}
      </button>
    </NavigationMenuLink>
  );
}
