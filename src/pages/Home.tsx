import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className="l-section l-section--home">
      <h1>Welcome to CADR</h1>
      <p>Your 3D modeling and rendering tool.</p>
      <div className="home__btn--section">
        <Link to="/editor" className="home__link">
          <button className="home__btn">Go to Editor</button>
        </Link>
        <Link to="/register" className="home__link">
          <button className="home__btn">Register now</button>
        </Link>
        <Link to="/login" className="home__link">
          <button className="home__btn">Login</button>
        </Link>
      </div>
    </section>
  );
}

export default Home;
