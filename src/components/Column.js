import React, { useState } from "react";
import Tile from "./Tile.js";
import classes from "./Column.module.css";

function Column({
  nTiles,
  nColumns,
  p,
  currentColumn,
  setCurrentColumn,
  gameEnded,
  setGameEnded,
  showImages,
  setShowImages,
  addToScore,
  setEnableCashOut,
  ix,
}) {
  let tiles = [];
  for (let i = 0; i < nTiles; i++) {
    tiles.push(i);
  }
  const onColumnClick = () => {
    if (nColumns == currentColumn) {
      setGameEnded(true);
    } else {
      setCurrentColumn((prev) => {
        return prev + 1;
      });
      setEnableCashOut(true);
    }
  };
  return (
    <div className={classes.column}>
      <div className={classes.main} onClick={onColumnClick}>
        {tiles.map((time, i) => {
          return (
            <Tile
              p={p}
              key={i}
              disabled={gameEnded || currentColumn != ix || currentColumn == -1}
              setGameEnded={setGameEnded}
              addToScore={addToScore}
              showImages={showImages}
              setShowImages={setShowImages}
            />
          );
        })}
      </div>
      <div className={classes.labels}>
        <p>
          x<strong>{(1 / p).toFixed(2)}</strong>
        </p>
      </div>
    </div>
  );
}

export default Column;
