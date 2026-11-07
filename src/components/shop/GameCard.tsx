import thumbnail from '../../assets/thumbnail.jpg';
import { StoreGame } from '../../types/Shop';
import { formatPrice } from '../../utils/formatPrice';

interface GameCardProps {
  game: StoreGame;
  owned?: boolean;
  onBuy?: (game: StoreGame) => void;
}

export default function GameCard({
  game,
  owned = false,
  onBuy,
}: GameCardProps) {
  const isFree = game.amount <= 0;

  return (
    <div className="game-card">
      <div className="game-card__media">
        <img
          src={thumbnail}
          alt={game.title}
          className="game-card__thumbnail"
        />
        {game.ageRestriction ? (
          <span className="game-card__age">{game.ageRestriction}+</span>
        ) : null}
      </div>
      <div className="game-card__content">
        <h3 className="game-card__title">{game.title}</h3>
        {game.playsCount ? (
          <p className="game-card__meta">
            {game.playsCount} {game.playsCount === 1 ? 'play' : 'plays'} this
            week
          </p>
        ) : null}
        <div className="game-card__footer">
          <span
            className={`game-card__price ${isFree ? 'game-card__price--free' : ''}`}
          >
            {formatPrice(game.amount, game.currency)}
          </span>
          {owned ? (
            <span className="game-card__badge">In library</span>
          ) : (
            <button className="btn-small" onClick={() => onBuy?.(game)}>
              {isFree ? 'Get' : 'Buy'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
