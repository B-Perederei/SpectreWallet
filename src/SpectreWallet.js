import React from 'react';
import { Routes, Route } from 'react-router-dom';

import WalletLogInPage from './WalletLogInPage.js';
import WalletHomePage from './WalletHomePage.js';
import WalletReceiveBTC from './WalletReceiveBTC.js';

export default function SpectreWallet() {
  return (
    <div className="SpectreWallet">
      <Routes>
        <Route path="/" element={<WalletLogInPage />} />
        <Route path="/wallet" element={<WalletHomePage />} />
        <Route path="/receiveBTC" element={<WalletReceiveBTC />} />
      </Routes>
    </div>
  );
}