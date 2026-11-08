"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SubmitEvent } from "react";
import { authClient } from "app/lib/auth-client"; //import the auth client
import { emailSchema } from "app/schemas";
import { useRouter } from "next/navigation";
const assets = "/assets/login";

export default function RegisterPage() {
  const [regError, setRegError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data } = authClient.useSession();

  useEffect(() => {
    if (data) {
      router.push("/profile");
    }
  }, [data]);

  async function handleRegister(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setRegError(null); // Reset error state before submission
    const form = event.currentTarget;

    const authSignInInfo = {
      email: form.querySelector<HTMLInputElement>("#email")?.value as string, // user email address
      password: form.querySelector<HTMLInputElement>("#password")?.value || "", // user password -> min 8 characters by default
      name: form.querySelector<HTMLInputElement>("#name")?.value as string, // optional user name
      callbackURL: "/profile", // optional callback URL after successful registration
    };

    if (
      !authSignInInfo.email ||
      !authSignInInfo.password ||
      !authSignInInfo.name
    ) {
      setRegError("Please fill in all required fields.");
      return;
    }

    if (!emailSchema.safeParse({ email: authSignInInfo.email }).success) {
      setRegError("Please input a valid email address.");
      return;
    }

    if (authSignInInfo.password.length < 8) {
      setRegError("Password must be at least 8 characters long.");
      return;
    }
    if (
      authSignInInfo.password !==
      form.querySelector<HTMLInputElement>("#confirm-password")?.value
    ) {
      setRegError("Passwords do not match.");
      return;
    }

    const { data, error } = await authClient.signUp.email(authSignInInfo, {
      onRequest: (ctx) => {
        setLoading(true);
      },
      onSuccess: (ctx) => {
        setLoading(false);
      },
      onError: (ctx) => {
        setLoading(false);
        setRegError(ctx.error.message);
      },
    });

    console.log("Register form submitted");
  }

  return (
    <main className="login-page">
      <section className="login-panel">
        <header className="login-brand">
          <div className="login-wordmark">
            <Link className="brand login-title" href="/">
              Cooking Daddy
            </Link>
            <img
              className="login-title-rule"
              src={`${assets}/efc23.svg`}
              alt=""
              aria-hidden="true"
            />
            <p className="login-subtitle mb-0">
              Can you smell what Daddy’s cooking?
            </p>
          </div>

          <img
            className="login-chef"
            src={`/assets/logo.svg`}
            alt="Cooking Daddy chef"
          />
        </header>

        <img
          className="login-rule"
          src={`${assets}/32350.svg`}
          alt=""
          aria-hidden="true"
        />

        <div className="login-form-wrap">
          <div className="d-flex align-items-center gap-2 mb-2">
            <h1 className="login-heading mb-0">Daddy's home, home for you.</h1>
          </div>
          <form
            onSubmit={handleRegister}
            className="login-form"
            aria-label="Login form"
          >
            <label className="visually-hidden" htmlFor="text">
              Name
            </label>
            <input
              className="form-control login-input"
              id="name"
              type="text"
              placeholder="Username"
            />
            <label className="visually-hidden" htmlFor="email">
              Email address
            </label>
            <input
              className="form-control login-input"
              id="email"
              type="text"
              placeholder="Email address"
            />
            <label className="visually-hidden" htmlFor="password">
              Password
            </label>
            <input
              className="form-control login-input"
              id="password"
              type="password"
              placeholder="Password"
            />
            <label className="visually-hidden" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              className="form-control login-input"
              id="confirm-password"
              type="password"
              placeholder="Type your password again"
            />

            <button
              className="btn login-button"
              type="submit"
              disabled={loading}
              style={{ backgroundColor: "#4d1010" }}
            >
              {loading ? "Registering..." : "Register"}
            </button>

            {regError && (
              <div
                className="alert alert-danger mb-3"
                style={{
                  color: "#721c24",
                  backgroundColor: "#f8d7da",
                  borderColor: "#f5c6cb",
                  padding: "0.75rem 1.25rem",
                  borderRadius: "0.25rem",
                }}
                role="alert"
              >
                ⚠ {regError}
              </div>
            )}
          </form>
        </div>
      </section>

      <aside className="login-photo" aria-label="Dining table photograph">
        <img
          src={`${assets}/5b33b.png`}
          alt="A dining table set with plated food"
        />
      </aside>
    </main>
  );
}
