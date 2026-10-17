import { Link } from 'react-router-dom';
import { useState } from 'react';
import useUserStore from '../stores/useUserStore';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

function NavBar() {
  const { isLoggedIn } = useUserStore();
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((s) => !s);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-top">
      <Logo />

      {isLoggedIn && (
        <div className="mobile-menu-container">
          <button
            className={`mobile-menu-button ${menuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 12h18M3 6h18M3 18h18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>

          {menuOpen && (
            <div
              className="mobile-overlay"
              onClick={closeMenu}
              aria-hidden="true"
            />
          )}

          <nav
            className={`navbar-mobile navbar ${menuOpen ? 'open' : ''}`}
            onClick={closeMenu}
          >
            <Link to="/dashboard" className="navbar__link">
              Dashboard
            </Link>
            <Link to="/change-data" className="navbar__link">
              Change data
            </Link>
            <Link to="/map" className="navbar__link">
              User Map
            </Link>
          </nav>
        </div>
      )}

      <nav className="navbar-desktop navbar">
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="navbar__link">
              Dashboard
            </Link>
            <Link to="/change-data" className="navbar__link">
              Change data
            </Link>
            <Link to="/map" className="navbar__link">
              User Map
            </Link>
          </>
        ) : null}
      </nav>

      <div className="navbar-right">
        <ThemeToggle />
        {isLoggedIn ? (
          <>
            <Link to="/logout" className="btn-primary">
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/register" className="btn-primary">
              Register now
            </Link>
            <Link to="/login" className="btn-primary">
              Login
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default NavBar;
