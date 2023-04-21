import React, { useState, useEffect } from "react";
import './styles.css';
import CryptoJS from 'crypto-js';
import QRCode from 'qrcode.react';

import WalletHeader from "./WalletHeader";
import WalletFooter from "./WalletFooter";

// Write code for logging out

function WalletReceiveBTC() {
  const [address, setAddress] = useState('3Kw2TQ93iMUYCQQ1NcaNkoo3TfaJ3QsZKS');

  const generateAddress = () => {
    // logic to generate a new address
    const newAddress = '3Kw2TQ93iMUYCQQ1NcaNkoo3TfaJ3QsZKS';
    setAddress(newAddress);
  }

  return (
    <div>
        <WalletHeader />
        <main id = 'receiveBTC'>
                <div class = "qrcode-container" id = "receiveBS">
                    <QRCode value={`bitcoin:${address}`} size={250} />
                </div>
                <span>
                    <button>Copy</button>
                    <p>3Kw2TQ93iMUYCQQ1NcaNkoo3TfaJ3QsZKS</p>
                </span>
                <div>
                    <button onClick={generateAddress}>Generate another address</button>
                    <a href="signedup.html">
                        <button>Return back</button>
                    </a>
                </div>  
        </main>

        <WalletFooter />
    </div>
  );
}

export default WalletReceiveBTC;