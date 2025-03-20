import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function MyButton({ name, path, }) {
  return (
    <div className="col-12 col-md-6 d-flex flex-column align-items-center my-2">
      <Link to={path} className="mt-2">
        <button className="btn btn-primary btn-lg">{name}</button>
      </Link>
    </div>
  );
}

function Home() {
  return (
    <div className="container text-center">
      <h1 className="my-4">Bem-vindo à minha máquina de doces</h1>
      <div className="row">
        
        <MyButton name="Máquina 1" path="/maquina1"  />
        <MyButton name="Máquina 2" path="/maquina2"  />
      </div>
    </div>
  );
}

// VOLTARRR
function BackButton() {
  const navigate = useNavigate();
  return (
    <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
      Voltar
    </button>
  );
}

function Maquina1() {
  return (
    <div className="container text-center">
      <h2 className="my-4">Bem-vindo à Máquina 1</h2>
      <BackButton />
    </div>
  );
}

function Maquina2() {
  return (
    <div className="container text-center">
      <h2 className="my-4">Bem-vindo à Máquina 2</h2>
      <BackButton />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maquina1" element={<Maquina1 />} />
        <Route path="/maquina2" element={<Maquina2 />} />
      </Routes>
    </Router>
  );
}
