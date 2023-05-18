import React, { useState, useEffect } from "react";
import './styles.css';
import QRCode from 'qrcode.react';

import WalletHeader from "./WalletHeader";
import WalletFooter from "./WalletFooter";

// import * as bitcoin from './bitcoinjs-lib'

function WalletReceiveBTC() {
  const rootXpub = sessionStorage.getItem('rootXpub');
  const [addressNum, setAddressNum] = useState(0);
  const [address, setAddress] = useState(deriveNewAddress(addressNum));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setAddress(deriveNewAddress(addressNum));
  }, [addressNum]);

  const getNewAddress = () => {
    setAddressNum(addressNum + 1);
    setCopied(false);
  }

  function deriveNewAddress() {
    // Bitcoinjs-lib generation
    // const hdNode = bitcoin.HDNode.fromBase58(rootXpub, bitcoin.networks.bitcoin);
    // const addressNode = hdNode.derive(addressNum);
    // const address = bitcoin.payments.p2pkh({ pubkey: addressNode.publicKey, network }).address;
    // return address
    const addresses = ['3E8ociqZa9mZUSwGdSmAEMAoAxBK3FNDcd', '14LrmBXD5DBA9Sow6r9Zf9Lu1PJTo9jXHu', 'mxnrVysAsvyB5Dr6PvdkdYS1i6pivtgwg5', 'movkjLwR7KHdXzD1yCKCBGQFNGTiG7NA56']
    const newAddress = addresses[addressNum % addresses.length];
    return newAddress
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
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
          
          <button onClick={getNewAddress} id="generateAddressButton">Generate another address</button>
          <a href="/wallet" class="buttonForwarding">
              Return back
          </a>    
        </main>
        <WalletFooter />
    </div>
  );
}

export default WalletReceiveBTC;