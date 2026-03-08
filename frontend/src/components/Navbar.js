import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("lore-dark") === "true";
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("lore-dark", isDark);
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <nav id="Navigation">
      <ul>
        <li>
          <Link to="/">
            <h1 className="title">Lorerealm</h1>
          </Link>
        </li>
        <li>
          <a className="nav-btn" href="https://www.twitch.tv/lorerealm">
            Twitch
          </a>
        </li>
        <li>
          <button className="nav-btn" type="button">
            Fluxer
          </button>
        </li>
      </ul>
    </nav>
  );
}
