import React, { useState, useEffect } from "react";

function BTCTransactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const xpubKey = JSON.parse(sessionStorage.getItem('publicAddresses'));
    const apiUrl = `https://blockchain.info/multiaddr?active=${xpubKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const txs = data.txs.map((tx) => {
          // Extract relevant transaction data
          const timestamp = new Date(tx.time * 1000);
          const isSent = tx.inputs.some((input) => input.prev_out.addr === xpubKey);
          const status = isSent ? "Sent" : "Received";
          const btcAmount = tx.result / 1e8;
          const usdAmount = btcAmount * localStorage.getItem('BTCPrice');

          return { timestamp, status, btcAmount, usdAmount };
        });

        // Sort transactions in reverse chronological order
        const sortedTxs = txs.sort((a, b) => b.timestamp - a.timestamp);

        setTransactions(sortedTxs);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h2>Recent transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>BTC</th>
            <th>USD</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, index) => (
            <tr key={index}>
              <td>{tx.timestamp.toLocaleDateString()}</td>
              <td>{tx.timestamp.toLocaleTimeString()}</td>
              <td>{tx.status}</td>
              <td>{tx.btcAmount.toFixed(8)}</td>
              <td>{tx.usdAmount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BTCTransactions;