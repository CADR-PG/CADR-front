import { useMemo, useState } from 'react';
import NavBar from './../components/NavBar';
import SnackbarProvider from '../components/SnackbarProvider';
import useAuth from '../hooks/useAuth';
import useUserStore from '../stores/useUserStore';
import useGetMostPopularGames from '../hooks/useGetMostPopularGames';
import useGetGamesList from '../hooks/useGetGamesList';
import useGetMyLibrary from '../hooks/useGetMyLibrary';
import usePlayGame from '../hooks/usePlayGame';
import GameCard from '../components/shop/GameCard';
import FeaturedGame from '../components/shop/FeaturedGame';
import WalletBalance from '../components/shop/WalletBalance';
import LibraryList from '../components/shop/LibraryList';
import StoreGuestOverlay from '../components/shop/StoreGuestOverlay';
import BuyGameModal from '../modals/BuyGameModal';
import PlayGameModal from '../modals/PlayGameModal';
import { LibraryGame, PlayGameReadModel, StoreGame } from '../types/Shop';

const placeholderGames: StoreGame[] = Array.from({ length: 4 }, (_, i) => ({
  id: `placeholder-${i}`,
  title: 'Upcoming game',
  amount: 0,
  currency: 'PLN',
}));

const placeholderFeatured: StoreGame = {
  id: 'placeholder-featured',
  title: 'Your next favourite game',
  description: 'Games built with CADR, ready to play right in the browser.',
  amount: 0,
  currency: 'PLN',
};

function Home() {
  const { isLoggedIn } = useUserStore();
  useAuth();

  const popular = useGetMostPopularGames();
  const gamesList = useGetGamesList();
  const library = useGetMyLibrary();
  const playGame = usePlayGame();

  const [query, setQuery] = useState<string>('');
  const [buying, setBuying] = useState<StoreGame | null>(null);
  const [session, setSession] = useState<PlayGameReadModel | null>(null);
  const [sessionTitle, setSessionTitle] = useState<string>('');

  const allGames: StoreGame[] = useMemo(
    () =>
      (gamesList.data?.data.items || []).map((game) => ({
        id: game.id,
        title: game.title,
        description: game.description,
        amount: game.amount,
        currency: game.currency,
        ageRestriction: game.ageRestriction,
      })),
    [gamesList.data],
  );

  const popularGames: StoreGame[] = useMemo(
    () =>
      (popular.data?.data.items || []).map((card) => {
        const details = allGames.find((game) => game.id === card.gameId);
        return {
          ...details,
          id: card.gameId,
          title: card.title,
          amount: card.amount,
          currency: card.currency,
          playsCount: card.playsCount,
        };
      }),
    [popular.data, allGames],
  );

  const libraryGames: LibraryGame[] = library.data?.data.items || [];
  const ownedIds = new Set(libraryGames.map((game) => game.id));

  const featured = isLoggedIn
    ? (popularGames[0] ?? allGames[0])
    : placeholderFeatured;

  const filteredGames = allGames.filter((game) =>
    query.trim() === ''
      ? true
      : game.title.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const handlePlay = (game: LibraryGame) => {
    playGame.mutate(game.id, {
      onSuccess: (response) => {
        setSessionTitle(game.title);
        setSession(response.data);
      },
    });
  };

  const renderAllGames = () => {
    if (!isLoggedIn) {
      return placeholderGames.map((game) => (
        <GameCard game={game} key={game.id} />
      ));
    }
    if (gamesList.isPending) {
      return <div className="empty-state">Loading games...</div>;
    }
    if (filteredGames.length === 0) {
      return <div className="empty-state">No games found</div>;
    }
    return filteredGames.map((game) => (
      <GameCard
        game={game}
        key={game.id}
        owned={ownedIds.has(game.id)}
        onBuy={setBuying}
      />
    ));
  };

  return (
    <div className="container">
      <NavBar />
      <section className="l-section l-section--shop">
        <div className={`shop ${isLoggedIn ? '' : 'shop--guest'}`}>
          {!isLoggedIn && <StoreGuestOverlay />}

          {featured && (
            <FeaturedGame
              game={featured}
              owned={ownedIds.has(featured.id)}
              onBuy={setBuying}
            />
          )}

          <div className="shop__section">
            <div className="shop__section-header">
              <h2 className="shop__section-title">Most popular</h2>
              <span className="shop__section-subtitle">Last 7 days</span>
            </div>
            <div className="shop__row">
              {(isLoggedIn ? popularGames : placeholderGames).map((game) => (
                <GameCard
                  game={game}
                  key={game.id}
                  owned={ownedIds.has(game.id)}
                  onBuy={setBuying}
                />
              ))}
              {isLoggedIn && popular.isSuccess && popularGames.length === 0 && (
                <div className="empty-state">No popular games yet</div>
              )}
            </div>
          </div>

          <div className="shop__layout">
            <div className="shop__main">
              <div className="shop__section-header">
                <h2 className="shop__section-title">All games</h2>
                <input
                  type="text"
                  className="search-bar"
                  placeholder="Search game..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  disabled={!isLoggedIn}
                />
              </div>
              <div className="shop__grid">{renderAllGames()}</div>
            </div>

            {isLoggedIn && (
              <aside className="shop__sidebar">
                <WalletBalance />
                <LibraryList
                  games={libraryGames}
                  onPlay={handlePlay}
                  playingId={
                    playGame.status === 'pending'
                      ? playGame.variables
                      : undefined
                  }
                />
              </aside>
            )}
          </div>
        </div>
      </section>

      <BuyGameModal game={buying} onClose={() => setBuying(null)} />
      <PlayGameModal
        title={sessionTitle}
        session={session}
        onClose={() => setSession(null)}
      />
      <SnackbarProvider />
    </div>
  );
}

export default Home;
