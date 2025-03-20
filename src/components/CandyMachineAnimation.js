import React, { useState } from "react";
import "../styles/CandyMachineAnimation.css";

const CandyMachineAnimation = () => {
  const [showCoin, setShowCoin] = useState(false);
  const [showCandy, setShowCandy] = useState(false);

  const insertCoin = () => {
    setShowCoin(true);
    setTimeout(() => {
      setShowCoin(false);
      setShowCandy(true);
    }, 1500); // Tempo da animação da moeda
  };

  return (
    <div className="machine-container">
      <div className="machine">
        {showCoin && <div className="coin"></div>}
        {showCandy && <div className="candy"></div>}
      </div>
      <button className="btn btn-success mt-3" onClick={insertCoin}>
        Inserir Moeda
      </button>
    </div>
  );
};

export default CandyMachineAnimation;
