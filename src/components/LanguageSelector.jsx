import { useState } from "react";
import { LANGUAGE_VERSIONS } from "./constats";


const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = ({ language, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const handleSelect = (lang) => {
    onSelect(lang);
    setIsOpen(false);
  };

  return (
    <div className="language-selector">
      <label className="language-label">Language:</label>
      <div className="menu">
        <button className="menu-button" onClick={toggleMenu}>
          {language}
        </button>
        {isOpen && (
          <ul className="menu-list">
            {languages.map(([lang, version]) => (
              <li
                key={lang}
                className={`menu-item ${lang === language ? "active" : ""}`}
                onClick={() => handleSelect(lang)}
              >
                {lang}
                <span className="version">({version})</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <style>
        {`.language-selector {
  margin-left: 0.5rem;
  margin-bottom: 1rem;
}

.language-label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1.125rem; /* similar to Chakra's lg */
}

.menu {
  position: relative;
  display: inline-block;
}

.menu-button {
  padding: 0.5rem 1rem;
  background-color: #2d2d2d;
  color: #fff;
  border: 1px solid #444;
  border-radius: 4px;
  cursor: pointer;
}

.menu-list {
  position: absolute;
  top: 110%;
  left: 0;
  z-index: 1000;
  list-style: none;
  margin: 0;
  padding: 0.5rem 0;
  background-color: #110c1b;
  border: 1px solid #444;
  border-radius: 4px;
  min-width: 200px;
}

.menu-item {
  padding: 0.5rem 1rem;
  color: #ccc;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu-item:hover {
  background-color: #1e1e1e;
  color: #63b3ed; /* blue.400 */
}

.menu-item.active {
  background-color: #1a1a1a;
  color: #63b3ed;
}

.version {
  color: #888;
  font-size: 0.875rem;
  margin-left: 0.5rem;
}
`}
      </style>
    </div>
  );
};

export default LanguageSelector;
