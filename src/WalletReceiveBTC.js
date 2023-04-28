import React, { useState, useEffect } from "react";
import './styles.css';
import CryptoJS from 'crypto-js';
import QRCode from 'qrcode.react';

import WalletHeader from "./WalletHeader";
import WalletFooter from "./WalletFooter";

// Write code for logging out

function WalletReceiveBTC() {
  const [address, setAddress] = useState('3Kw2TQ93iMUYCQQ1NcaNkoo3TfaJ3QsZKS');
  const [copied, setCopied] = useState(false);

  const generateAddress = () => {
    // logic to generate a new address
    const newAddress = '3Kw2TQ93iMUYCQQ1NcaNkoo3TfaJ3QsZKS';
    setAddress(newAddress);
    setCopied(false);
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  }

  return (
    <div>
        <WalletHeader />
        <main id = 'receiveBTC'>
          <div class = "qrcode-container" id = "receiveBS">
              <QRCode value={`bitcoin:${address}`} size={265} />
          </div>
          <div class="address-container">
              <p id="addressText" onClick={copyToClipboard}>{address}</p>
              {copied && <p id="copiedAddress">Copied!</p>}
            </div>
          
          <button onClick={generateAddress} id="generateAddressButton">Generate another address</button>
          <a href="/wallet" class="buttonForwarding">
              Return back
          </a>    
        </main>
        <WalletFooter />
    </div>
  );
}

export default WalletReceiveBTC;