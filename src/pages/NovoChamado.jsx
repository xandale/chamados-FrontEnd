import { useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function NovoChamado() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [prioridade, setPrioridade] = useState("baixa");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/chamados", { titulo, descricao, categoria, prioridade });
      alert("Chamado criado com sucesso!");
      navigate("/chamados");
    } catch {
      alert("Erro ao criar chamado");
    }
  };

  return (
    <>
      <Navbar />
      <div className="app-container">
        <div className="card" style={{ maxWidth: 840, margin: '1.25rem auto' }}>
          <form onSubmit={handleSubmit} className="novo-form">
            <h2 className="page-title">Novo Chamado</h2>
            <input className="input" placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} />
            <textarea className="input" placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} />
            <input className="input" placeholder="Categoria" value={categoria} onChange={e => setCategoria(e.target.value)} />
            <select className="input" value={prioridade} onChange={e => setPrioridade(e.target.value)}>
              <option value="baixa">Baixa</option>
              <option value="media">Média</option>
              <option value="alta">Alta</option>
            </select>
            <button type="submit" className="btn btn--primary">Criar</button>
          </form>
        </div>
      </div>
    </>
  );
}
