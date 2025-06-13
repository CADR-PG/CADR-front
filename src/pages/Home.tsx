import { Link } from 'react-router-dom';
import NavBar from './../components/NavBar';
import SnackbarProvider from '../components/SnackbarProvider';
import useAuth from '../hooks/useAuth';

function Home() {
  useAuth();

  return (
    <div className="container">
      <NavBar />
      <section className="l-section l-section--home">
        <h1>Welcome to CADR</h1>
        <p>Your 3D modeling and rendering tool.</p>
        <div className="home__btn--section">
          <Link to="/editor" className="home__link">
            <button className="home__btn">Go to Editor</button>
          </Link>
        </div>
      </section>
      <SnackbarProvider />
    </div>
  );
}

export default Home;
