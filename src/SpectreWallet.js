import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import CryptoJS from 'crypto-js';

import logo from "./images/spectre_logo.svg";
import telegramLogo from "./images/telegram_logo.svg";
import mailLogo from "./images/mail_logo.svg";
import githubLogo from "./images/github_logo.svg";
import './styles.css';

import SignedIn from './SignedIn.js';


function SpectreWallet() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  
  const [btcPrice, setBtcPrice] = useState(null);
  const [isUpdatingBtcPrice, setIsUpdatingBtcPrice] = useState(false);
  
  useEffect(() => {
    const fetchBtcPrice = async () => {
      try {
        const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
        const data = await response.json();
        setBtcPrice(parseInt(data.price));
      } catch (error) {
        console.error(error);
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
      setBtcPrice(parseInt(data.price));
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdatingBtcPrice(false);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsEmailValid(event.target.checkValidity());
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setIsPasswordValid(event.target.checkValidity());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEmailValid && isPasswordValid) {
      
      const iterations = 100000;
      const keyLength = 256;
      const salt =  CryptoJS.SHA256(email + password).toString();
      const privateKey = CryptoJS.PBKDF2(password, salt, { keySize: keyLength/32, iterations: iterations, hasher: CryptoJS.algo.SHA256 });
      
      localStorage.setItem('privateKey', privateKey);      
      
      // Rendering new page
      ReactDOM.render(<SignedIn />, document.getElementById('signedin'));
      window.location.href = '/wallet.html';
    } else {
      console.log("Form is invalid. Please fill all fields correctly.");
    }
  };

  return (
    <div>
      <header>
        <a href="http://localhost:3000">
          <img src={logo} alt="SpectreWallet logo" />
          <div>
            <h2>SpectreWallet</h2>
            <h4>Browser based Bitcoin wallet</h4>
          </div>
        </a>
        <div>
          <h3>BTC price</h3>
          <h4 onClick={handleFetchBtcPrice} title="Update price">
          {isUpdatingBtcPrice ? 'Updating...' : btcPrice ? '$ ' + btcPrice.toLocaleString() : 'Loading...'}
          </h4>
        </div>
      </header>

      <main>
        <div>
          <h1>
            Secure Bitcoin wallet
            <br />
            whenever you go
          </h1>
          <a href="https://spectre.app/#algorithm" class="buttonForwarding" target="_blank">
            How does it work?
          </a>
        </div>

        <form onSubmit = {handleSubmit} title="Log in">
          <label htmlFor="uname">Your email</label>
          <input 
            type="email" 
            placeholder="example@mail.com" 
            name="email" 
            value={email}
            onChange={handleEmailChange}
            required />

          <label htmlFor="psw">Your masterphrase</label>
          <input 
            type="password" 
            placeholder="qwerty123" 
            value={password}
            onChange={handlePasswordChange}
            minLength="8"
            required />

          <button type="submit">
            Enter your wallet
          </button>
        </form>
      </main>

      <footer>
        <div className="container">
          {/* References */}
          <div className="footer-left">
            <ul>
              <li>
                <a href="https://t.me/Bogdan_Per" target="_blank">
                  <img src={telegramLogo} alt="Telegram reference" />
                </a>
              </li>
              <li>
                <a href="mailto:woncaru@gmail.com" target="_blank">
                  <img src={mailLogo} alt="Email reference" />
                </a>
              </li>
              <li>
                <a href="https://github.com/B-Perederei" target="_blank">
                  <img src={githubLogo} alt="Github reference" />
                </a>
              </li>
              <li>
                <a href="https://github.com/B-Perederei" target="_blank">
                  <b>We are fully open source!</b>
                </a>
              </li>
            </ul>
          </div>
          {/* Support */}
          <div className="footer-right">
            <p>Support SpectreWallet: </p>
            <p>14LrmBXD5DBA9Sow6r9Zf9Lu1PJTo9jXHu</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SpectreWallet;