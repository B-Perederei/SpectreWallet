import React, { useState, useEffect } from "react";
import logo from "./images/spectre_logo.svg";
import telegramLogo from "./images/telegram_logo.svg";
import mailLogo from "./images/mail_logo.svg";
import githubLogo from "./images/github_logo.svg";
import './styles.css';

function SpectreWallet() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [btcPrice, setBtcPrice] = useState(null);

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
      window.location.href = '/signedup.html';
    } else {
      console.log("Form is invalid. Please fill all fields correctly.");
    }
  };

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
    const interval = setInterval(fetchBtcPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <header>
        <a href="/index.html">
          <img src={logo} alt="SpectreWallet logo" />
          <div>
            <h2>SpectreWallet</h2>
            <h4>Browser based Bitcoin wallet</h4>
          </div>
        </a>
        <div>
          <h3>BTC price</h3>
          <h4>{btcPrice ? '$ ' + btcPrice.toLocaleString() : 'Loading...'}</h4>
        </div>
      </header>

      <main>
        <div>
          <h1>
            Secure Bitcoin wallet
            <br />
            whenever you go
          </h1>
          <button onClick={() => window.location.href = '/'}>
            How does it work?
          </button>
        </div>

        <form onSubmit = {handleSubmit} title="signing up">
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