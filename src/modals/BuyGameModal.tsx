import Modal from './ManageProjectModal';
import useBuyGame from '../hooks/useBuyGame';
import useWalletBalance from '../hooks/useWalletBalance';
import { StoreGame } from '../types/Shop';
import { formatPrice } from '../utils/formatPrice';

type BuyGameModalProps = {
  game: StoreGame | null;
  onClose: () => void;
};

export default function BuyGameModal({ game, onClose }: BuyGameModalProps) {
  const buyGame = useBuyGame();
  const wallet = useWalletBalance();
  const buying = buyGame.status === 'pending';

  if (!game) return null;

  const isFree = game.amount <= 0;

  const handleConfirm = () => {
    buyGame.mutate(game.id, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Modal
      open={!!game}
      onClose={onClose}
      title={isFree ? 'Get game' : 'Buy game'}
    >
      <div className="buy-summary">
        <div className="buy-summary__row">
          <span>Game</span>
          <strong>{game.title}</strong>
        </div>
        <div className="buy-summary__row">
          <span>Price</span>
          <strong>{formatPrice(game.amount, game.currency)}</strong>
        </div>
        {!isFree && (
          <div className="buy-summary__row">
            <span>Wallet balance</span>
            <strong>{wallet.data?.data || '0.00 PLN'}</strong>
          </div>
        )}
      </div>
      <div className="modal-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onClose}
          disabled={buying}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleConfirm}
          disabled={buying}
        >
          {buying ? 'Processing...' : isFree ? 'Add to library' : 'Buy'}
        </button>
      </div>
    </Modal>
  );
}
