import React from "react";
import BTCPrice from './BTCPrice';
import logo from "./images/spectre_logo.svg";
import logout from "./images/logout.svg";

function WalletHeader() {
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
                <a href = "/" title="Logout" target = "_self">
                    <img src={logout} alt="Logout image" class = "logoutImg"/>
                </a>
            </div>
    </header>
  );
}

export default WalletHeader;