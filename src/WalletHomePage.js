import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './styles.css';
import CryptoJS from 'crypto-js';

import WalletHeader from "./WalletHeader";
import WalletFooter from "./WalletFooter";
import BTCTransactions from "./BTCTransactions";
import BTCBalance from "./BTCBalance";

// Write code for logging out

function WalletHomePage() {

  const navigate = useNavigate();  
  return (
    <div>

        <WalletHeader />

        <main id="homePage">
            
            <div class="walletBalance">
                <h1 class="BTCBalanceInUSD">Balance: 100,60 USD</h1>
                <h2 class="BTCBalanceInBTC">0,00018595 BTC</h2>
            </div>

            <div class="buttonsWalletFunctions">
                <span>
                    <div class = "mainFunctions">
                        <a href="/sendBTC" class="buttonForwarding" id = "manipulateBTC" target="_self">
                            Send BTC
                        </a>
                        <a href="/receiveBTC" onClick={navigate('/receiveBTC')} class="buttonForwarding" id = "manipulateBTC" target="_self">
                            Receive BTC
                        </a>
                    </div>
                </span>
                <a href="showRecoveryPhrase.html" class="buttonForwarding" id = "recoveryPhraseButton" target="_self">
                    Show recovery phrase
                </a>
            </div>

            <BTCTransactions />
        </main>

        <WalletFooter />
    </div>
  );
}

export default WalletHomePage;