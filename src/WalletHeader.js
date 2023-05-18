import React from "react";
import BTCPrice from './BTCPrice';
import logo from "./images/spectre_logo.svg";
import logout from "./images/logout.svg";
import { useNavigate } from 'react-router-dom';

function WalletHeader() {

  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem('privateKey');
    sessionStorage.removeItem('rootXpub');
    sessionStorage.removeItem('BTCBalance');
    navigate('/');
  };

  return (
    <header>
            <a href = "http://localhost:3000/wallet">
                <img src={logo} alt="SpectreWallet logo" class = "logo"/>
                <div>
                    <h2>SpectreWallet</h2>
                    <h4>Browser based Bitcoin wallet</h4>
                </div>
            </a>
            <div id="headerDivPriceAndLogout">
                <BTCPrice />
                <button onClick={handleLogout} title="Logout" target="_self" class="logoutButton">
                    <img src={logout} alt="Logout image" className="logoutImg"/>
                </button>
            </div>
    </header>
  );
}

export default WalletHeader;