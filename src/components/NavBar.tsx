import { Link } from 'react-router-dom';
import logo from './../assets/logo.png';

function NavBar() {
  return (
    <div className="navbar-hld">
      <div className="navbar__logo">
        <img className="logo" src={logo} height="40px" />
      </div>
      <div className="navbar__btn">
        <Link to="/register" className="nav__link">
          <button className="nav__btn">Register now</button>
        </Link>
        <Link to="/login" className="home__link">
          <button className="nav__btn">Login</button>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
