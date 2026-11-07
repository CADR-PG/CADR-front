import thumbnail from '../../assets/thumbnail.jpg';
import { StoreGame } from '../../types/Shop';
import { formatPrice } from '../../utils/formatPrice';

interface FeaturedGameProps {
  game: StoreGame;
  owned?: boolean;
  onBuy?: (game: StoreGame) => void;
}

export default function FeaturedGame({
  game,
  owned = false,
  onBuy,
}: FeaturedGameProps) {
  const isFree = game.amount <= 0;

  return (
    <div className="shop__featured">
      <img src={thumbnail} alt={game.title} className="shop__featured-image" />
      <div className="shop__featured-info">
        <span className="shop__featured-label">Featured &amp; recommended</span>
        <h2 className="shop__featured-title">{game.title}</h2>
        {game.description ? (
          <p className="shop__featured-description">{game.description}</p>
        ) : null}
        <div className="shop__featured-tags">
          {game.ageRestriction ? (
            <span className="game-card__age game-card__age--static">
              {game.ageRestriction}+
            </span>
          ) : null}
          {game.playsCount ? (
            <span className="shop__featured-plays">
              {game.playsCount} plays this week
            </span>
          ) : null}
        </div>
        <div className="shop__featured-footer">
          <span
            className={`game-card__price ${isFree ? 'game-card__price--free' : ''}`}
          >
            {formatPrice(game.amount, game.currency)}
          </span>
          {owned ? (
            <span className="game-card__badge">In library</span>
          ) : (
            <button className="btn-primary" onClick={() => onBuy?.(game)}>
              {isFree ? 'Get for free' : 'Buy now'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
