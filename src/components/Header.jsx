import { useState, useEffect } from "react";

const Header = ({ servicioLink, contactoLink, nosotrosLink }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleMenuToggle = () => {
      setMenuOpen((prev) => !prev);
    };

    const menuButton = document.getElementById("menu-toggle");
    if (menuButton) {
      menuButton.addEventListener("click", handleMenuToggle);
    }

    return () => {
      if (menuButton) {
        menuButton.removeEventListener("click", handleMenuToggle);
      }
    };
  }, []);

  return (
    <header className="d-flex justify-center align-items-center m-5">
        <img src="/Imagotipo-Original.svg" alt="Logo" className="logo w-44" />
    </header>
    /*<header className="px-5 lg:px-10 shadow-lg">
      <a href="/">
        <img src="/Imagotipo-Original.svg" alt="Logo" className="logo" />
      </a>
      <nav>
        <button id="menu-toggle" className="menu" aria-label="Toggle Menu">
          ☰
        </button>
        <ul className={`menu-list ${menuOpen ? "open" : ""}`}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href={nosotrosLink}>Nosotros</a>
          </li>
          <li>
            <a href={servicioLink}>Servicios</a>
          </li>
          <li>
            <a href={contactoLink}>Contacto</a>
          </li>
          <li>
            <a href="https://empleado-contagramm.web.app/" target="_blank">Verificación de Empleado</a>
          </li>
          <li>
            <a href="/politica-privacidad">Política de Privacidad</a>
          </li>
        </ul>
      </nav>
    </header>*/
  );
};

export default Header;