import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import CryptoJS from 'crypto-js';
import * as bitcoin from './bitcoinjs'

import logo from "./images/spectre_logo.svg";
import telegramLogo from "./images/telegram_logo.svg";
import mailLogo from "./images/mail_logo.svg";
import githubLogo from "./images/github_logo.svg";

import BTCPrice from './BTCPrice';

const ecc = require('tiny-secp256k1')

function WalletLogInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsEmailValid(event.target.checkValidity());
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setIsPasswordValid(event.target.checkValidity());
  };

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEmailValid && isPasswordValid) {
      
      const iterations = 100000;
      const keyLength = 256;
      const salt =  CryptoJS.SHA256(email + password).toString();
      const privateKey = CryptoJS.PBKDF2(password, salt, { keySize: keyLength/32, iterations: iterations, hasher: CryptoJS.algo.SHA256 });
      
      sessionStorage.setItem('privateKey', privateKey);      
      
      // My extended public key
      // const bip32 = bitcoin.BIP32Factory(bitcoin.tin)
      // bitcoin.ECPair
      bitcoin.bip32.BIP32Factory();
      // const hdNode = bitcoin.fromPrivateKey(String(privateKey), bitcoin.networks.bitcoin);
      //console.log(hdNode.derivePath("m/0'/0/0").keyPair.getAddress());
      const publicAddresses = ['xpub6CsEhhbnonP7eWHsnSvudAVR7MVyaqabZmtbe9fQGdy3p7CbnFJwU2uWinC1uATFtMfHM1tCcqyL1GVGsErNK4PfjsqiX6tzshDzdKxL9Ux'] // ['3E8ociqZa9mZUSwGdSmAEMAoAxBK3FNDcd', '14LrmBXD5DBA9Sow6r9Zf9Lu1PJTo9jXHu']
      sessionStorage.setItem('publicAddresses', JSON.stringify(publicAddresses));

      navigate('/wallet');
    } else {
      console.log("Form is invalid. Please fill all fields correctly.");
    }
  };

  return (
    <div>
      <header id="LogIn">
        <a href="http://localhost:3000">
          <img src={logo} alt="SpectreWallet logo" class = "logo"/>
          <div>
            <h2>SpectreWallet</h2>
            <h4>Browser based Bitcoin wallet</h4>
          </div>
        </a>
        <BTCPrice />
      </header>

      <main id="LogIn">
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
                <a href="https://github.com/B-Perederei/SpectreWallet" target="_blank">
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

export default WalletLogInPage;