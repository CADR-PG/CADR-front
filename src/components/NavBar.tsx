import { Link } from 'react-router-dom';
import logo from './../assets/logo.png';
import useUserStore from '../stores/useUserStore';
import useLogout from '../hooks/useLogout';

function NavBar() {
  const { isLoggedIn } = useUserStore();
  const { mutate } = useLogout();

  return (
    <div className="navbar-hld">
      <Link to="/" className="navbar__logo">
        <img className="logo" src={logo} height="40px" />
      </Link>
      <div className="navbar__btn">
        {isLoggedIn ?
          (
            <Link to="/" className="nav__link">
              <button className="nav__btn" onClick={() => mutate()}>Logout</button>
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
