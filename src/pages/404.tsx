import { Link } from 'react-router-dom';
import NavBar from './../components/NavBar';

export default function NotFound() {
  return (
    <div className="container">
      <NavBar />
      <div className="not-found">
        <div className="not-found__inner">
          <h1 className="not-found__code">404</h1>
          <p className="not-found__message">Page not found.</p>
          <Link to="/" className="not-found__link">
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
