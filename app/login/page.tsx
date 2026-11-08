import Link from "next/link";

const assets = "/assets/login";

export default function LoginPage() {
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
            src={`${assets}/cbe46.svg`}
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
            <h1 className="login-heading mb-0">It’s time to cook.</h1>
            <span className="wip-badge">W.I.P</span>
          </div>
          <form className="login-form" aria-label="Login form">
            <label className="visually-hidden" htmlFor="email">
              Email address
            </label>
            <input
              className="form-control login-input"
              id="email"
              type="email"
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
            <div className="form-check login-check">
              <input
                className="form-check-input"
                id="remember"
                type="checkbox"
              />
              <label className="form-check-label" htmlFor="remember">
                Remember Me
              </label>
            </div>
            <Link
              className="btn login-button"
              href="/profile"
              style={{ backgroundColor: "#4d1010" }}
            >
              Log in
            </Link>
            <span className="login-text-action">
              Forgot password? <small>W.I.P</small>
            </span>
            <span
              className="btn create-button"
              style={{
                backgroundColor: "#ffded1",
                outline: "5px solid #4d1010",
              }}
            >
              Create new account <small>W.I.P</small>
            </span>
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
