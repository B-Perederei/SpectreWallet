import React, { useState, useEffect } from "react";

function BTCTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [canFetch, setCanFetch] = useState(true);

  useEffect(() => {
    const fetchTransactions = () => {
      const xpubKey = sessionStorage.getItem('rootXpub');
      const apiUrl = 'https://blockchain.info/multiaddr?active=' + xpubKey;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const txs = data.txs.map((tx) => {
            // Extract relevant transaction data
            const timestamp = new Date(tx.time * 1000);
            const isSent = tx.inputs.some((input) => input.prev_out.addr === xpubKey);
            const status = isSent ? "Sent" : "Received";
            const btcAmount = tx.result / 1e8;
            const usdAmount = btcAmount * sessionStorage.getItem('BTCPrice');
            const hash = tx.hash;

            return { timestamp, status, btcAmount, usdAmount, hash };
          });

          // Sort transactions in reverse chronological order
          const sortedTxs = txs.sort((a, b) => b.timestamp - a.timestamp);

          setTransactions(sortedTxs);
          setCanFetch(true);
        })
        .catch((error) => console.error(error));
    };

    // Fetch transactions initially
    fetchTransactions();

    // Interval for automatic fetch
    const reloadInterval = 10*1000;
    const intervalId = setInterval(() => {
      if (canFetch) {
        fetchTransactions();
        setCanFetch(false);
      }
    }, reloadInterval);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h2 class='transactionHistoryTitle'>Transaction History</h2>
      <table>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((tx, index) => (
              <tr key={index}>
                <a href={`https://www.blockchain.com/explorer/transactions/btc/${tx.hash}`} target="_blank">
                  <td>{tx.status} <br /> {tx.timestamp.toLocaleDateString()}</td>
                  <td>{tx.status === 'Received' ? `+ ${tx.usdAmount.toFixed(2)} USD` : `- ${tx.usdAmount.toFixed(2)} USD`}
                    <br />
                    {tx.btcAmount.toFixed(8)} BTC
                  </td>
                </a>
              </tr>
            ))
          ) : (
            <React.Fragment>
              <tr>
                <td>Loading...</td>
                <td>Loading...</td>
              </tr>
              <tr>
                <td>Loading...</td>
                <td>Loading...</td>
              </tr>
              <tr>
                <td>Loading...</td>
                <td>Loading...</td>
              </tr>
            </React.Fragment>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BTCTransactions;