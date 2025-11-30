import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useUserStore from '../stores/useUserStore';
import Logo from './Logo';

function NavBar() {
  const { isLoggedIn } = useUserStore();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark');
    localStorage.theme = isDark ? 'dark' : 'light';
  }

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
            <Link to="/change-data" className="navbar__link">
              Change data
            </Link>
            <Link to="/dashboard" className="navbar__link">
              Dashboard
            </Link>
          </nav>
        </div>
      )}

      <nav className="navbar-desktop navbar">
        {isLoggedIn ? (
          <>
            <Link to="/change-data" className="navbar__link">
              Change data
            </Link>
            <Link to="/dashboard" className="navbar__link">
              Dashboard
            </Link>
          </>
        ) : null}
      </nav>

      <div className="navbar-right">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Change theme"
        >
          <svg
            className="svg-darkmode-icons light-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            className="svg-darkmode-icons dark-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
          </svg>
        </button>
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
