import React from "react";
import classes from "./Wallet.module.css";
import walletIcon from "./wallet.webp";

function Wallet({ balance }) {
  return (
    <div className={classes.main}>
      <div className={classes.icon}>
        <img src={walletIcon} />
      </div>
      <div className={classes.balance}>
        <div>Balance</div>
        <div className={classes.amount}> Rs. {balance.toFixed(2)}</div>
      </div>
    </div>
  );
}

export default Wallet;
