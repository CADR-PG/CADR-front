import { Link } from 'react-router-dom';

export default function StoreGuestOverlay() {
  return (
    <div className="shop__guest-overlay">
      <div className="shop__guest-box">
        <h3>Log in to browse the store</h3>
        <p>
          Discover games made with CADR, build your library and play them right
          in the browser.
        </p>
        <div className="shop__guest-actions">
          <Link to="/login" className="btn-primary">
            Login
          </Link>
          <Link to="/register" className="btn-primary">
            Register now
          </Link>
        </div>
      </div>
    </div>
  );
}
