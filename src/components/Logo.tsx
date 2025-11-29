import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="site-top__logo">
      <svg
        className="logo__img"
        aria-hidden="true"
        width="28"
        height="28"
        viewBox="0 0 24 24"
      >
        <path d="M12 2L2 7l10 5l10-5zm0 7L2 4v13l10 5zm0 0l10-5v13l-10 5z" />
      </svg>
      <span className="logo__title">CADR</span>
    </Link>
  );
}
