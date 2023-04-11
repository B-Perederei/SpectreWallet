import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import logo from "./images/spectre_logo.svg";
import telegramLogo from "./images/telegram_logo.svg";
import mailLogo from "./images/mail_logo.svg";
import githubLogo from "./images/github_logo.svg";
import './styles.css';
import CryptoJS from 'crypto-js';


function WalletHomePage() {
  return (
    <div>
        <header>
            <a href = "signedup.html">
                <img src="images/spectre_logo.svg" alt="SpectreWallet logo" />
                <h2>SpectreWallet</h2>
                <h4>Browser based Bitcoin wallet</h4>
            </a>
            <span>
                <p>
                    BTC price
                    <br />
                    $ 22,000
                </p>
            </span>
            <a href = "index.html">
                <img src="images/logout.svg" alt="Logout image" />
                Logout
            </a>
        </header>

        <main>
            <div>
                <h1>Balance: 100,60 USD</h1>
                <h2>0,00018595 BTC</h2>
            </div>

            <div>
                <a href="sendBTC.html">
                    <button>Send BTC</button>
                </a>
                <a href="receiveBTC.html">
                    <button>Receive BTC</button>
                </a>
                <a href="showRecoveryPhrase.html">
                    <button>Show recovery phrase</button>
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

        <footer>
            <div>
                <p>
                    This page uses javascript to generate your addresses and sign your transactions within your browser.
                    <br />
                    This means we never receive your private keys.
                </p>
            </div>
        </footer>
    </div>
  );
}

export default WalletHomePage;