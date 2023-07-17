import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

const manifestUrl =
  'https://sukhsinghcodes.github.io/my-ton-wallet/tonconnect-manifest.json';

const root = document.getElementById('root');

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <TonConnectUIProvider manifestUrl={manifestUrl}>
        <App />
      </TonConnectUIProvider>
    </React.StrictMode>,
  );
}
