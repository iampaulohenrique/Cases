import { useState } from "react";
import "../styles/CharacterAnimation.css";

export default function CharacterAnimation({ onInsertCoin }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleInsertCoin = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      onInsertCoin();
    }, 2000); // Tempo da animação
  };

  return (
    <div className="container text-center mt-3">
      <div className="row justify-content-center">
        <div className="col-6 d-flex flex-column align-items-center">
          <div className={`character ${isAnimating ? "animate" : ""}`}></div>
          <button
            className="btn btn-warning mt-3"
            onClick={handleInsertCoin}
            disabled={isAnimating}
          >
            Inserir Moeda
          </button>
        </div>
      </div>
    </div>
  );
}
