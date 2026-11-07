import useWalletBalance from '../../hooks/useWalletBalance';

export default function WalletBalance() {
  const wallet = useWalletBalance();

  return (
    <div className="shop__panel">
      <h3 className="shop__panel-title">Wallet</h3>
      <p className="shop__wallet-balance">
        {wallet.isPending ? '...' : wallet.data?.data || '0.00 PLN'}
      </p>
    </div>
  );
}
