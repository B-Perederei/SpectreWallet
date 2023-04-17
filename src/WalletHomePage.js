import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import './styles.css';
import CryptoJS from 'crypto-js';

import BTCPrice from './BTCPrice';
import WalletHeader from "./WalletHeader";
import WalletFooter from "./WalletFooter";

// Write code for logging out

function WalletHomePage() {
  return (
    <div>

        <WalletHeader />

        <main id="homePage">
            <div>
                <h1 class="h1-price">Balance: 100,60 USD</h1>
                
                <h2 class="h2-price">0,00018595 BTC</h2>
            </div>

            <div class="buttonsWalletFunctions">
                <span>
                    <a href="sendBTC.html" class="buttonForwarding" target="_self">
                        Send BTC
                    </a>
                    <a href="receiveBTC.html" class="buttonForwarding" target="_self">
                        Receive BTC
                    </a>
                </span>
                <a href="showRecoveryPhrase.html" class="buttonForwarding" target="_self">
                    Show recovery phrase
                </a>
            </div>
            
            <div>
                <h2>Recent transactions</h2>
                <table>
                    <tr>
                        <th>
                            Received
                            <br />
                            05.03.2022
                        </th>
                        <th>
                            +0,11 USD
                            <br />
                            0,000004124 BTC
                        </th>
                        </tr>
                        <tr>
                        <th>
                            Received
                            <br />
                            05.03.2022
                        </th>
                        <th>
                            +0,11 USD
                            <br />
                            0,000004124 BTC
                        </th>
                        </tr>
                        <tr>
                        <th>
                            Received
                            <br />
                            05.03.2022
                        </th>
                        <th>
                            +0,11 USD
                            <br />
                            0,000004124 BTC
                        </th>
                        </tr>
                </table>
            </div>
        
        </main>

        <WalletFooter />
    </div>
  );
}

export default WalletHomePage;