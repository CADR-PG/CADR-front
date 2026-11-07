import { LibraryGame } from '../../types/Shop';

interface LibraryListProps {
  games: LibraryGame[];
  onPlay: (game: LibraryGame) => void;
}

export default function LibraryList({ games, onPlay }: LibraryListProps) {
  return (
    <div className="shop__panel">
      <h3 className="shop__panel-title">My library</h3>
      {games.length === 0 ? (
        <p className="shop__panel-empty">Your library is empty</p>
      ) : (
        <ul className="shop__library">
          {games.map((game) => (
            <li key={game.id} className="shop__library-item">
              <span className="shop__library-title">{game.title}</span>
              <button className="btn-small" onClick={() => onPlay(game)}>
                Play
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
