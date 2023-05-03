/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Buffer from './bitcoinjs-lib.js';
import bitcoin from './bitcoinjs-lib.js';
import networks from './bitcoinjs-lib.js'
import ecpair from 'ecpair';
import { BIP32Factory } from './bitcoinjs-lib.js';
// import bip32 from 'bip32';
// import { Buffer } from 'buffer';
// const bitcoin = require('bitcoinjs-lib');
// const bip32  = require('bip32');

const apiEndpoint = 'https://blockstream.info/api';
const possibleAddresses = 100;

const deriveAddress = (node) => {
  const { address } = bitcoin.payments.p2pkh({ pubkey: node.publicKey });
  return address;
};

const deriveAddresses = (node, count) => {
  const addresses = [];
  for (let i = 0; i < count; i++) {
    const childNode = node.derive(i);
    const address = deriveAddress(childNode);
    addresses.push(address);
  }
  return addresses;
};

const getBalanceForAddresses = async (addresses) => {
  const url = `${apiEndpoint}/address/${addresses.join(",")}/utxo`;
  const response = await fetch(url);
  const data = await response.json();
  return data.reduce((total, utxo) => total + utxo.value, 0);
};

const BTCBalance = () => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const privateKey = localStorage.getItem('privateKey');
    if (privateKey) {
      const bip32factory = BIP32Factory(ecpair);
      // const bip32factory = Bip32Factory(bitcoinjs.ECPair);
      // const privateKey = Buffer.from(privateKey, 'hex');

      // const masterNode = BIP32Factory.fromSeed(privateKey, networks.bitcoin);
      //const addresses = deriveAddresses(masterNode, possibleAddresses); // Change the number of addresses as needed
      getBalanceForAddresses(addresses)
        .then(setBalance)
        .catch(console.error);
    }
  }, []);

  return (
    <div class="walletBalance">
      {balance !== null ? (
        <React.Fragment>
            <h1 class="BTCBalanceInUSD">Balance: {balance / 1e16 * 30000} USD</h1>
            <h2 class="BTCBalanceInBTC">{balance / 1e16} BTC</h2>
        </React.Fragment>
      ) : (
        <h1 class="BTCBalanceInUSD">Balance: Loading...</h1>
      )}
    </div>
  );
};

export default BTCBalance;