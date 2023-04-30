import React, { useState, useEffect } from "react";
import './styles.css';

import WalletHeader from "./WalletHeader";
import WalletFooter from "./WalletFooter";


function WalletSendBTC() {

  return (
    <div>
        <WalletHeader />
        <main>
            <div>
                <h1>Balance: 100,60 USD</h1>
                <h2>0,00018595 BTC</h2>
            </div>

            <form action = "signedup.html">
                <div>
                    <h2>Destination address</h2>
                    <span>
                        <input type="text" placeholder="Paste or load QR code" name="address" required></input>
                        <button>Load QR code</button>
                    </span>
                </div>
                <div>
                    <h2>Amount</h2>
                    <span>
                        <input type="number" placeholder="$0.00 USD" name="AmountUSD" required></input>
                        =
                        <input type="number" placeholder="0.00 BTC" name="AmountBTC" required></input>
                    </span>
                </div>
                <div>
                    <h2>Transaction fee</h2>
                    <span>
                        <input type="number" placeholder="4 sat/byte" name="TransactionFee" required></input>
                        0.00003 (0,20 $)
                    </span>
                    <select>
                        <option>Low fee</option>
                        <option>Medium fee</option>
                        <option>High fee</option>
                    </select>
                </div>
                <span>
                    <button onclick="window.location.href = signedup.html;" type="submit">SEND</button>
                </span>
            </form>
        </main>
        <WalletFooter />
    </div>
  );
}

export default WalletSendBTC;