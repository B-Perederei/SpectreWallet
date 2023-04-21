import React, { useEffect, useState } from 'react';
//import * as assert from 'assert';
// import * as bitcoin from 'bitcoinjs-lib';
// import bip32 from 'bip32';


/*
const apiEndpoint = 'https://blockstream.info/api';
const possibleAddresses = 1;

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
      const masterNode = 0;// bitcoin.fromBase58(privateKey);
      const addresses = deriveAddresses(masterNode, possibleAddresses); // Change the number of addresses as needed
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

export default BTCBalance;*/
