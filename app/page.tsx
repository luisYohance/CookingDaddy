import Link from "next/link";

const assets = "/assets/landing";

export default function LandingPage() {
  return (
    <main className="landing-page" data-node-id="1:1179">
      <header className="landing-header container-fluid d-flex align-items-center justify-content-between">
        <h1 className="brand brand-landing mb-0">Cooking Daddy</h1>
        <nav className="d-flex align-items-center">
          <span className="landing-nav-link">About Us</span>
          <Link className="landing-nav-link" href="/login">
            Login
          </Link>
        </nav>
        <img
          className="landing-header-rule"
          src={`${assets}/44d71.svg`}
          alt=""
          aria-hidden="true"
        />
      </header>

      <section className="landing-hero" aria-label="Cooking Daddy introduction">
        <img
          className="landing-food"
          src={`${assets}/9cd3a.png`}
          alt="A home-cooked meal arranged on a wooden table"
        />
        <div className="landing-overlay" />
        <img
          className="landing-curve"
          src={`${assets}/a4a26.svg`}
          alt=""
          aria-hidden="true"
        />
        <img
          className="landing-chef"
          src={`${assets}/2fed5.svg`}
          alt="Cooking Daddy chef"
        />
      </section>

      <h2 className="landing-tagline">Cooking With Love</h2>
    </main>
  );
}
