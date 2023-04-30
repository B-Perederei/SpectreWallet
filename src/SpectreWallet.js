import React from 'react';
import { Routes, Route } from 'react-router-dom';

import WalletLogInPage from './WalletLogInPage.js';
import WalletHomePage from './WalletHomePage.js';
import WalletReceiveBTC from './WalletReceiveBTC.js';
import WalletSendBTC from './WalletSendBTC.js';

export default function SpectreWallet() {
  return (
    <div className="SpectreWallet">
      <Routes>
        <Route path="/" element={<WalletLogInPage />} />
        <Route path="/wallet" element={<WalletHomePage />} />
        <Route path="/receiveBTC" element={<WalletReceiveBTC />} />
        <Route path="/sendBTC" element={<WalletSendBTC />} />
      </Routes>
    </div>
  );
}