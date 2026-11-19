"use client";

import { useActionState } from "react";
import { signUpWithEmail } from "./actions";

export default function SignUpForm() {
  const [state, formAction, isPending] = useActionState(signUpWithEmail, null);

  return (
    <div className="flex flex-col">
      <div className="mx-auto min-h-screen flex flex-col">
        <div className="flex items-center" id="branding">
          <img className="max-h-[8rem] p-2" src="/assets/logo.svg" alt="Logo" />
          <h1 className="text-[3rem]">CookingDaddy</h1>
        </div>
        <form
          action={formAction}
          className="flex flex-col gap-5 p-10 items-center justify-center bg-white rounded-4xl my-auto"
        >
          <div className="w-sm">
            <h1 className="mt-10 text-center text-2xl/9 font-bold text-foreground">
              Create new account
            </h1>
          </div>

          <div className="flex flex-col gap-1.5 w-sm">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-foreground"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Chef Daddy"
              className="block rounded-md w-full bg-foreground/10 px-2 py-1.5 placeholder:text-gray-500 text-black outline-1 outline-white/10 focus:outline-indigo-500"
            />
          </div>

          <div className="flex flex-col gap-1.5 w-sm">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="john@my-company.com"
              className="block rounded-md w-full bg-foreground/10 px-2 py-1.5 placeholder:text-gray-500 text-black outline-1 outline-white/10  focus:outline-indigo-500"
            />
          </div>

          <div className="flex flex-col gap-1.5 w-sm ">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="*****"
              className="block rounded-md w-full bg-foreground/10 px-2 py-1.5 placeholder:text-gray-500 text-black outline-1 outline-white/10  focus:outline-indigo-500"
            />
          </div>

          {state?.error && (
            <div className="rounded-md px-3 py-2 text-sm text-red-500">
              {state.error}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="flex w-sm justify-center rounded-md bg-foreground px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-foreground/90"
          >
            {isPending ? "Creating account..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
