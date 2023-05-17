/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const apiEndpoint = 'https://blockchain.info/multiaddr?active=';

const getBalanceForAddresses = async (addresses) => {
  const url = apiEndpoint + addresses.join("|");
  const response = await fetch(url);
  const data = await response.json();
  return data.addresses.reduce((total, address) => total + address.final_balance, 0) / 1e8;
};

const BTCBalance = () => {
  const [balance, setBalance] = useState(sessionStorage.getItem('Balance'));
  const price = sessionStorage.getItem('BTCPrice')
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!sessionStorage.getItem('privateKey')) {
      navigate('/');
    }
    const publicAddresses = JSON.parse(sessionStorage.getItem('publicAddresses'));
    if (publicAddresses) {
      const interval = setInterval(() => {
        sessionStorage.setItem('Balance', balance || '0');
        setBalance(sessionStorage.getItem('Balance'));
        getBalanceForAddresses(publicAddresses)
          .then(newBalance => {
            setBalance(newBalance);
            sessionStorage.setItem('Balance', newBalance);
          })
          .catch(console.error);
      }, 10*1000);

      return () => {
        clearInterval(interval);
      };
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