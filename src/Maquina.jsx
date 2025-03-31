import { useState, useCallback } from "react";
import "../styles/App.css";
import CharacterAnimation from "./CharacterAnimation";
import CandyMachineAnimation from "./CandyMachineAnimation";

function Maquina({ nome }) {
  const [saldo, setSaldo] = useState(0);
  const [mensagem, setMensagem] = useState("");
  const [showCandy, setShowCandy] = useState(false);

  const inserirMoeda = async (valor) => {
    const response = await fetch(
      `http://localhost:8080/api/maquinas/${nome.toLowerCase()}/adicionarMoeda`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ valor }),
      }
    );
    const data = await response.text();
    setMensagem(data);
    setSaldo((prevSaldo) => prevSaldo + valor);
  };

  const comprarDoce = async (tipo) => {
    if (saldo >= DOCE_PRECOS[tipo]) {
      const response = await fetch(
        `http://localhost:8080/api/maquinas/${nome.toLowerCase()}/comprarDoce`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tipo }),
        }
      );
      const data = await response.text();
      setMensagem(data);
      if (data.includes("Você comprou")) {
        setSaldo((prevSaldo) => prevSaldo - DOCE_PRECOS[tipo]);
        setShowCandy(true);
        setTimeout(() => setShowCandy(false), 3000);
      }
    } else {
      setMensagem("Saldo insuficiente!");
    }
  };

  return (
    <div className="container text-center">
      <h2 className="subtitle mt-4">Bem-vindo à {nome}</h2>
      <h3>Saldo: R${saldo},00</h3>

      <CharacterAnimation onInsertCoin={() => inserirMoeda(1)} />

      <h3 className="mt-4">Escolha seu doce:</h3>
      <div className="row justify-content-center">
        <div className="col-12 col-md-4 mb-2">
          <button className="btn btn-warning w-100" onClick={() => comprarDoce('A')}>Doce A (R$6,00)</button>
        </div>
        <div className="col-12 col-md-4 mb-2">
          <button className="btn btn-warning w-100" onClick={() => comprarDoce('B')}>Doce B (R$7,00)</button>
        </div>
        <div className="col-12 col-md-4 mb-2">
          <button className="btn btn-warning w-100" onClick={() => comprarDoce('C')}>Doce C (R$8,00)</button>
        </div>
      </div>

      {mensagem && <p className="alert alert-info mt-3"><strong>{mensagem}</strong></p>}

      <CandyMachineAnimation showCandy={showCandy} />

      <button className="btn btn-secondary mt-4" onClick={() => window.history.back()}>
        Voltar
      </button>
    </div>
  );
}
