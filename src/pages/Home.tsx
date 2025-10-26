import { Link } from 'react-router-dom';
import NavBar from './../components/NavBar';
import SnackbarProvider from '../components/SnackbarProvider';
import useAuth from '../hooks/useAuth';
import useUserStore from '../stores/useUserStore';

function Home() {
  const { isLoggedIn } = useUserStore();
  useAuth();

  return (
    <div className="container">
      <NavBar />
      <section className="l-section l-section--home">
        <div className="home__container">
          <h1 className="home__title"><span className="home__subtitle">3D</span> engine in the browser for game developers</h1>
          <p className="home__content">CADR combines rendering, scene editor, asset storage, and build system. Logged in? Jump straight to the panel and launch your project.</p>
          <div className="home__btn">
            {isLoggedIn ? (
              <Link to="/dashboard" className="btn-primary">
                Go to dashboard
              </Link>
            ) : null}
          </div>
        </div>
      </section>
      <SnackbarProvider />
    </div>
  );
}

export default Home;
