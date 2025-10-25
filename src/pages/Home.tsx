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
          <h1 className="home__title">Silnik <span className="home__subtitle">3D</span> w przeglądarce dla twórców gier</h1>
          <p className="home__content">CADR łączy renderowanie, edytor scen, przetrzymywanie assetów i system buildów. Zalogowany? Wskakuj prosto do panelu i odpalaj projekt.</p>
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
