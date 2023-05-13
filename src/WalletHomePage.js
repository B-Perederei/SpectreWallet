import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './styles.css';

import WalletHeader from "./WalletHeader";
import WalletFooter from "./WalletFooter";
import BTCTransactions from "./BTCTransactions";
import BTCBalance from "./BTCBalance";


function WalletHomePage() {

  const navigate = useNavigate();  
  return (
    <div>
        <WalletHeader />
        <main id="homePage">
            <BTCBalance />
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