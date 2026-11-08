"use client";
import { authClient } from "app/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const assets = "/assets/login";

export default function LoginPage() {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data } = authClient.useSession();

  useEffect(() => {
    if (data) {
      router.push("/profile");
    }
  }, [data]);

  async function handleLogin(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const { data, error } = await authClient.signIn.email(
      {
        email: form.querySelector<HTMLInputElement>("#email")?.value as string,
        password: form.querySelector<HTMLInputElement>("#password")
          ?.value as string,
        callbackURL: "/profile",
        rememberMe: false,
      },
      {
        onRequest: (ctx) => {
          setLoading(true);
        },
        onSuccess: (ctx) => {
          setLoading(false);
        },
        onError: (ctx) => {
          setLoading(false);
          setLoginError(ctx.error.message);
        },
      },
    );
  }

  return (
    <main className="login-page" data-node-id="1:1193">
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
            <h1 className="login-heading mb-0">It's time to cook.</h1>
          </div>
          <form
            className="login-form"
            aria-label="Login form"
            onSubmit={handleLogin}
          >
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
            {loginError && (
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
                ⚠ {loginError}
              </div>
            )}
            <div className="form-check login-check">
              <input
                className="form-check-input"
                id="remember"
                type="checkbox"
              />
              <label className="form-check-label" htmlFor="remember">
                Remember Me <small>(W.I.P)</small>
              </label>
            </div>
            <button
              className="btn login-button"
              type="submit"
              style={{ backgroundColor: "#4d1010" }}
            >
              Log in
            </button>
            <span className="login-text-action">
              Forgot password? <small>W.I.P</small>
            </span>
            <Link
              href="/register"
              className="btn create-button"
              style={{
                backgroundColor: "#ffded1",
                outline: "5px solid #4d1010",
              }}
            >
              Create new account
            </Link>
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
