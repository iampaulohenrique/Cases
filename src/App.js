import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import CandyMachineAnimation from './components/CandyMachineAnimation';

const DOCE_PRECOS = {
  A: 6,
  B: 7,
  C: 8,
};

const MOEDAS_ACEITAS = [1, 2, 5];

function MyButton({ name, path, disabled }) {
  return (
    <div className="col-12 col-md-6 d-flex flex-column align-items-center my-2">
      <Link to={path} className="mt-2">
        <button
          className={`btn btn-primary btn-lg ${disabled ? "disabled-button" : ""}`}
          disabled={disabled}
        >
          {name}
        </button>
      </Link>
    </div>
  );
}

function Home() {
  return (
    <div className="container text-center">
      <h1 className="title">Escolha a máquina de doces!</h1>
      <div className="row">
        <MyButton name="Máquina 1" path="/maquina1" />
        <MyButton name="Máquina 2" path="#" disabled={true} />
      </div>
    </div>
  );
}

function BackButton() {
  const navigate = useNavigate();
  return (
    <button className="secondary-button" onClick={() => navigate(-1)}>
      Voltar
    </button>
  );
}

async function chamarBackend(url, method, body = null) {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error('Erro na requisição');
    }

    return await response.text();
  } catch (error) {
    console.error('Erro ao chamar o backend:', error);
    return 'Erro ao conectar com o servidor.';
  }
}

function Maquina({ nome }) {
  const [saldo, setSaldo] = useState(0);
  const [mensagem, setMensagem] = useState("");
  const [showCandy, setShowCandy] = useState(false);

  const inserirMoeda = useCallback(async (valor) => {
    if (MOEDAS_ACEITAS.includes(valor)) {
      const response = await chamarBackend(
        `http://localhost:8080/api/maquinas/${nome.toLowerCase()}/adicionarMoeda`,
        'POST',
        { valor }
      );
      setMensagem(response);
      setSaldo((prevSaldo) => prevSaldo + valor);
    } else {
      setMensagem("Moeda não aceita!");
    }
  }, [nome]);

  const comprarDoce = useCallback(async (tipo) => {
    if (saldo >= DOCE_PRECOS[tipo]) {
      const response = await chamarBackend(
        `http://localhost:8080/api/maquinas/${nome.toLowerCase()}/comprarDoce`,
        'POST',
        { tipo }
      );
      setMensagem(response);
      if (response.includes("Você comprou")) {
        setSaldo((prevSaldo) => prevSaldo - DOCE_PRECOS[tipo]);
        setShowCandy(true);
        setTimeout(() => setShowCandy(false), 3000);
      }
    } else {
      setMensagem("Saldo insuficiente!");
    }
  }, [nome, saldo]);

  return (
    <div className="container text-center">
      <h2 className="subtitle">Bem-vindo à {nome}</h2>
      <h3>Saldo: R${saldo},00</h3>
      <div className="coin-buttons">
        <button className="success-button" onClick={() => inserirMoeda(1)}>R$1,00</button>
        <button className="success-button" onClick={() => inserirMoeda(2)}>R$2,00</button>
        <button className="success-button" onClick={() => inserirMoeda(5)}>R$5,00</button>
      </div>
      <h3>Escolha seu doce:</h3>
      <div className="sweet-buttons">
        <button className="warning-button" onClick={() => comprarDoce('A')}>Doce A (R$6,00)</button>
        <button className="warning-button" onClick={() => comprarDoce('B')}>Doce B (R$7,00)</button>
        <button className="warning-button" onClick={() => comprarDoce('C')}>Doce C (R$8,00)</button>
      </div>
      {mensagem && <p className="message"><strong>{mensagem}</strong></p>}
      <CandyMachineAnimation showCandy={showCandy} />
      <BackButton />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maquina1" element={<Maquina nome="maquina1" />} />
      </Routes>
    </Router>
  );
}
