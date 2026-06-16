export default function Navbar({ current, navigate }) {
  const links = ["Home", "Collection", "Lookbook", "About", "Contact"];

  return (
    <nav className="navbar">
      <div
        className="navbar-logo"
        onClick={() => navigate("Home")}
      >
        FYNTRIX
      </div>

      <ul>
        {links.map((link) => (
          <li
            key={link}
            className={current === link ? "active" : ""}
            onClick={() => navigate(link)}
          >
            {link}
          </li>
        ))}
      </ul>

      <button
        className="navbar-btn"
        onClick={() => navigate("Collection")}
      >
        SHOP NOW
      </button>
    </nav>
  );
}