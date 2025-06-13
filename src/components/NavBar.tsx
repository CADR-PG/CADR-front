import { Link } from 'react-router-dom';
import logo from './../assets/logo.png';
<<<<<<< create-env
import { useEffect, useState } from 'react';

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
    const tokenCookie = cookies.find((cookie) =>
      cookie.startsWith('token=cadr_access_token'),
    );
    setIsLoggedIn(!!tokenCookie);
  }, []);
=======
import useUserStore from '../stores/useUserStore';

function NavBar() {
  const { isLoggedIn } = useUserStore();
>>>>>>> main

  return (
    <div className="navbar-hld">
      <Link to="/" className="navbar__logo">
        <img className="logo" src={logo} height="40px" alt="Logo" />
      </Link>
<<<<<<< create-env
      {!isLoggedIn && (
        <div className="navbar__btn">
          <Link to="/register" className="nav__link">
            <button className="nav__btn">Register now</button>
          </Link>
          <Link to="/login" className="home__link">
            <button className="nav__btn">Login</button>
          </Link>
        </div>
      )}
=======
      <div className="navbar__btn">
        {isLoggedIn ? (
          <Link to="/logout" className="nav__link">
            <button className="nav__btn">Logout</button>
          </Link>
        ) : (
          <>
            <Link to="/register" className="nav__link">
              <button className="nav__btn">Register now</button>
            </Link>
            <Link to="/login" className="home__link">
              <button className="nav__btn">Login</button>
            </Link>
          </>
        )}
      </div>
>>>>>>> main
    </div>
  );
}

export default NavBar;
