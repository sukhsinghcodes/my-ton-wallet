import '@twa-dev/sdk';
import './App.css';
import { TonConnectButton } from '@tonconnect/ui-react';
import { useCounterContract, useTonConnect } from './hooks';

function App() {
  const { value, address, sendIncrement } = useCounterContract();
  const { connected } = useTonConnect();

  return (
    <div className="App">
      <div className="Container">
        <h1>My TON Wallet</h1>
        <TonConnectButton />

        <div className="Card">
          <b>Counter Address</b>
          {address && (
            <div className="Hint">{`${address.slice(0, 30)}...`}</div>
          )}
        </div>

        <div className="Card">
          <b>Counter Value</b>
          <div>{value ?? 'Loading...'}</div>
        </div>

        <button
          className={`Button ${connected ? 'Active' : 'Disabled'}`}
          onClick={() => {
            void sendIncrement();
          }}
        >
          Increment
        </button>
      </div>
    </div>
  );
}

export default App;
