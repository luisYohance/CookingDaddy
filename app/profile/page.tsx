import Link from "next/link";

const assets = "/assets/profile";

const followedChefs = Array.from({ length: 6 }, (_, index) => index);
const recipes = [
  { src: "b9559.png", alt: "Baked eggplant dish" },
  { src: "1d1f1.png", alt: "Grilled meat wrap" },
  { src: "a7b03.png", alt: "Pumpkin pie" },
  { src: "28a74.png", alt: "Tofu soup" },
];

export default function ProfilePage() {
  return (
    <main className="profile-page" data-node-id="1:1226">
      <aside className="profile-sidebar">
        <Link className="sidebar-brand" href="/">
          <img src={`${assets}/026d2.svg`} alt="" aria-hidden="true" />
          <span className="brand">Cooking Daddy</span>
        </Link>
        <img
          className="sidebar-rule"
          src={`${assets}/bd6ea.svg`}
          alt=""
          aria-hidden="true"
        />

        <nav className="sidebar-nav">
          <Link className="sidebar-link" href="/profile">
            <img src={`${assets}/d0af1.svg`} alt="" aria-hidden="true" />
            Home
          </Link>
          <span className="sidebar-link">
            <img src={`${assets}/e20e3.svg`} alt="" aria-hidden="true" />
            Explore
          </span>
          <span className="sidebar-link">
            <img src={`${assets}/dbd25.svg`} alt="" aria-hidden="true" />
            Favorites
          </span>
        </nav>

        <section className="followed-section">
          <h2>Followed Chefs</h2>
          <img
            className="followed-rule"
            src={`${assets}/a9dba.svg`}
            alt=""
            aria-hidden="true"
          />
          {followedChefs.map((chef) => (
            <div className="followed-chef" key={chef}>
              <span className="followed-avatar">
                <img src={`${assets}/c0bb2.svg`} alt="" aria-hidden="true" />
                <img src={`${assets}/079ca.svg`} alt="" aria-hidden="true" />
              </span>
              <span>Name</span>
            </div>
          ))}
        </section>

        <div className="sidebar-actions">
          <span
            className="btn settings-button"
            style={{ backgroundColor: `#4d1010` }}
          >
            <img src={`${assets}/07452.svg`} alt="" aria-hidden="true" />
            Settings
          </span>
          <Link
            className="btn signout-button"
            href="/login"
            style={{ outline: `5px solid #4d1010` }}
          >
            Sign Out
          </Link>
        </div>
      </aside>

      <section className="profile-content">
        <header className="profile-card">
          <img
            className="profile-avatar"
            src={`${assets}/54eaa.png`}
            alt="Daddy’s Mommy"
          />
          <div className="profile-copy">
            <h1>Daddy’s Mommy</h1>
            <p>Expert Culinary Teacher</p>
            <div className="location">
              <img src={`${assets}/f3d04.svg`} alt="" aria-hidden="true" />
              <span>Hotel, California USA</span>
            </div>
          </div>
          <div className="followers">
            <img src={`${assets}/22e1f.svg`} alt="" aria-hidden="true" />
            <span>Followers</span>
          </div>
        </header>

        <div className="recipes-header">
          <h2>My Recipes</h2>
          <span className="avatar-overflow">+1</span>
        </div>
        <img
          className="recipes-rule"
          src={`${assets}/797a8.svg`}
          alt=""
          aria-hidden="true"
        />

        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <article className="recipe-card" key={recipe.src}>
              <img src={`${assets}/${recipe.src}`} alt={recipe.alt} />
            </article>
          ))}
        </div>
      </section>
      <div className="sidebar-scroll" aria-hidden="true">
        <img src={`${assets}/38ef7.svg`} alt="" />
        <span />
        <img src={`${assets}/a5f7f.svg`} alt="" />
      </div>
    </main>
  );
}
