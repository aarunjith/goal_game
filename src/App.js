import { useState } from "react";
import classes from "./App.module.css";
import Column from "./components/Column";
import Wallet from "./components/Wallet";
import { Button, FormControlLabel, RadioGroup, Radio } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";

function App() {
  const [gameEnded, setGameEnded] = useState(true);
  const [showImages, setShowImages] = useState(false);
  const [nColumns, setNColumns] = useState(4);
  const [multipliers, setMultipliers] = useState([]);
  const [nRows, setNRows] = useState(3);
  const [balance, setBalance] = useState(1000);
  const [betAmount, setBetAmount] = useState(0);
  const [currentColumn, setCurrentColumn] = useState(-1);
  const [disableBets, setDisableBets] = useState(false);
  const [payOut, setPayOut] = useState(0);
  const [error, setError] = useState("");
  const [seed, setSeed] = useState(1);
  const [enableCashOut, setEnableCashOut] = useState(false);
  const [isBet, setIsBet] = useState(false);

  const addToScore = (p) => {
    let multiplier = 1 / p;
    let wonAmount = multiplier * betAmount;
    setPayOut(wonAmount);
  };

  const onGridChange = (e) => {
    reset();
    let action = e.target.value;
    if (action == "Small") {
      setNColumns(4);
      setNRows(3);
      setMultipliers([1.45, 2.18, 3.27, 4.91]);
    } else if (action == "Medium") {
      setNColumns(7);
      setNRows(4);
      setMultipliers([1.29, 1.72, 2.29, 3.06, 4.08, 5.45, 7.26]);
    } else {
      setNColumns(10);
      setNRows(5);
      setMultipliers([
        1.21, 1.51, 1.89, 2.36, 2.96, 3.7, 4.62, 5.78, 7.22, 9.03,
      ]);
    }
  };

  const onBet = () => {
    if (balance >= betAmount) {
      setCurrentColumn(0);
      setIsBet(true);
      setBalance(balance - betAmount);
      setDisableBets(true);
      setEnableCashOut(true);
      setGameEnded(false);
      setError("");
    } else {
      setError("Not enough balance");
      reset();
    }
  };

  const onCashOut = () => {
    setGameEnded(true);
    setEnableCashOut(false);
    setIsBet(false);
    setBalance((balance) => {
      return balance + payOut;
    });
  };

  const reset = () => {
    setSeed(Math.random());
    setEnableCashOut(false);
    setGameEnded(true);
    setCurrentColumn(0);
    setShowImages(false);
    setDisableBets(false);
    setIsBet(false);
    setPayOut(0);
  };
  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <h1>Goal</h1>
        <Wallet balance={balance} />
      </div>
      <div className={classes.controls}>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="bet-amount">Bet Amount</InputLabel>
          <Input
            id="bet-amount"
            value={betAmount}
            onChange={(event) => {
              setBetAmount(event.target.value);
            }}
            startAdornment={
              <InputAdornment position="start">Rs.</InputAdornment>
            }
          />
        </FormControl>

        <RadioGroup
          row
          name="grid_size"
          defaultValue="small"
          onChange={onGridChange}
          className={classes.parameters}
        >
          <p>Select grid size</p>
          <FormControlLabel
            value="Small"
            label="Small"
            labelPlacement="bottom"
            control={<Radio size="small" />}
          />
          <FormControlLabel
            value="Medium"
            label="Medium"
            labelPlacement="bottom"
            control={<Radio size="small" />}
          />
          <FormControlLabel
            value="Large"
            label="Large"
            labelPlacement="bottom"
            control={<Radio size="small" />}
          />
        </RadioGroup>

        <div className={classes.buttons}>
          <div className={classes.bet_controls}>
            <Button
              variant="contained"
              disabled={betAmount == 0 || disableBets}
              onClick={onBet}
            >
              Bet
            </Button>
          </div>
          <Button
            variant="contained"
            disabled={!isBet && (gameEnded || !enableCashOut)}
            onClick={onCashOut}
          >
            Cash Out
          </Button>
        </div>
        {error && <p className={classes.error}>{error}</p>}
      </div>
      <div className={classes.grid}>
        {multipliers.map((multiplier, ix) => {
          return (
            <Column
              nTiles={nRows}
              nColumns={nColumns}
              p={1 / multiplier}
              gameEnded={gameEnded}
              setGameEnded={setGameEnded}
              addToScore={addToScore}
              currentColumn={currentColumn}
              setCurrentColumn={setCurrentColumn}
              showImages={showImages}
              setShowImages={setShowImages}
              setEnableCashOut={setEnableCashOut}
              key={multiplier + seed}
              ix={ix}
            />
          );
        })}
      </div>
      <div className={classes.reset}>
        <Button variant="contained" onClick={reset} disabled={!gameEnded}>
          Start Again
        </Button>
      </div>
    </div>
  );
}

export default App;
