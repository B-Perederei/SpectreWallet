import React, { useState, useEffect } from "react";

function BtcPrice() {
  const [btcPrice, setBtcPrice] = useState(null);
  const [isUpdatingBtcPrice, setIsUpdatingBtcPrice] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const fetchBtcPrice = async () => {
      try {
        const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
        const data = await response.json();
        setBtcPrice(parseInt(data.price));
        sessionStorage.setItem('BTCPrice', parseInt(data.price));
      } catch (error) {
        console.error(error);
        setFetchError(true);
      }
    };
    fetchBtcPrice();
  }, []);

  const handleFetchBtcPrice = async () => {
    if (isUpdatingBtcPrice) {
      return;
    }
    try {
      setIsUpdatingBtcPrice(true);
      const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
      const data = await response.json();
      const currentPrice = parseInt(data.price);
      setBtcPrice(parseInt(currentPrice));
      sessionStorage.setItem('BTCPrice', currentPrice);
    } catch (error) {
      console.error(error);
      setFetchError(true);
    } finally {
      setIsUpdatingBtcPrice(false);
    }
  };

  return (
    <div>
      <h3>BTC price</h3>
      <h4 onClick={handleFetchBtcPrice} title="Update price" id="btcPrice">
        {isUpdatingBtcPrice
          ? 'Updating...'
          : fetchError
          ? 'Not Available'
          : btcPrice
          ? '$ ' + btcPrice.toLocaleString()
          : 'Loading...'}
      </h4>
    </div>
  );
}

export default BtcPrice;