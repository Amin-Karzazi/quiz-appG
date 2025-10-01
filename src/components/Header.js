import React from "react";
import "./Header.css"; // tu peux créer un fichier css séparé

function Header() {
  return (
    <header className="header">
      <nav>
        <h1>Mon Quiz</h1>
        <ul>
          <li><a href="/">Accueil</a></li>
          <li><a href="https://amin-karzazi.github.io/pgak/">Portfolio</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
