import { Link } from 'react-router-dom';
import logo from './../assets/logo.png';
import useUserStore from '../stores/useUserStore';

function NavBar() {
  const { isLoggedIn } = useUserStore();

  return (
    <div className="navbar-hld">
      <Link to="/" className="navbar__logo">
        <img className="logo" src={logo} height="40px" />
      </Link>
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
    </div>
  );
}

export default NavBar;
