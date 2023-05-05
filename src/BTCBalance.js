/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import {BIP32Factory} from './bitcoinjs.js';
// import bip32 from 'bip32';
// import { Buffer } from 'buffer';
// const bitcoin = require('bitcoinjs-lib');
// const bip32  = require('bip32');
/*
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
*/

const apiEndpoint = 'https://blockchain.info/multiaddr?active=';

const getBalanceForAddresses = async (addresses) => {
  const url = apiEndpoint + addresses.join("|");
  console.log(url)
  const response = await fetch(url);
  const data = await response.json();
  return data.addresses.reduce((total, address) => total + address.final_balance, 0) / 1e8;
};

const BTCBalance = () => {
  const [balance, setBalance] = useState(sessionStorage.getItem('Balance'));
  const price = localStorage.getItem('BTCPrice')
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!sessionStorage.getItem('privateKey')) {
      navigate('/');
    }
    const publicAddresses = JSON.parse(sessionStorage.getItem('publicAddresses'));
    if (publicAddresses) {
      /*
      const bip32 = BIP32Factory(ecc);
      const node = bip32.fromSeed(privateKey)
      
      // const bip32factory = Bip32Factory(bitcoinjs.ECPair);
      // const privateKey = Buffer.from(privateKey, 'hex');

      // const masterNode = BIP32Factory.fromSeed(privateKey, networks.bitcoin);
      //const addresses = deriveAddresses(masterNode, possibleAddresses); // Change the number of addresses as needed
      const address = ['123']*/
      sessionStorage.setItem('Balance', balance || '0');
      setBalance(sessionStorage.getItem('Balance'));
      getBalanceForAddresses(publicAddresses)
        .then(newBalance => {
          setBalance(newBalance);
          sessionStorage.setItem('Balance', newBalance);
        })
        .catch(console.error);
    }
  }, []);

  return (
    <div class="walletBalance">
      {balance !== null ? (
        <React.Fragment>
            <h1 class="BTCBalanceInUSD">Balance: {(balance * price).toFixed(2)} USD</h1>
            <h2 class="BTCBalanceInBTC">{balance} BTC</h2>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h1 class="BTCBalanceInUSD">Balance: 0000.00 USD</h1>
          <h2 class="BTCBalanceInBTC">0.0000000 BTC</h2>
        </React.Fragment>
      )}
    </div>
  );
};

export default BTCBalance;