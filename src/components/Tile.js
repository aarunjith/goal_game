import React, { useState } from "react";
import bombIcon from "./bomb.png";
import flagIcon from "./flag.png";
import classes from "./Tile.module.css";

function Tile({
  p,
  disabled,
  addToScore,
  setGameEnded,
  showImages,
  setShowImages,
}) {
  const [isBomb, setIsBomb] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const findMine = () => {
    setShowImages(true);
    setShowImage(true);
    if (Math.random() <= p) {
      setIsBomb(false);
      addToScore(p);
    } else {
      setIsBomb(true);
      setGameEnded(true);
    }
  };
  return (
    <div className={classes.main}>
      <button onClick={findMine} disabled={disabled}>
        {isBomb && showImage && showImages && <img src={bombIcon} width="30" />}
        {!isBomb && showImage && showImages && (
          <img src={flagIcon} width="30" />
        )}
      </button>
    </div>
  );
}

export default Tile;
