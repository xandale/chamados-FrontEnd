import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import Navbar from "../components/Navbar";
export default function EditarChamado() {
  const { id } = useParams();
  const [chamado, setChamado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const carregarChamado = async () => {
      try {
        const res = await api.get(`/chamados/${id}`);
        setChamado(res.data);
      } catch {
        alert("Erro ao carregar chamado");
      }
    };
    carregarChamado();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/chamados/${id}`, chamado);
      alert("Chamado atualizado com sucesso!");
      navigate("/chamados");
    } catch {
      alert("Erro ao atualizar chamado");
    }
  };

  if (!chamado) return <p>Carregando...</p>;

  return (
    <>
       <Navbar />
      <div className="app-container">
        <div className="card" style={{ maxWidth: 840, margin: '1.25rem auto' }}>
          <form onSubmit={handleUpdate} className="editar-form">
            <h2 className="page-title">Editar Chamado</h2>
            <input className="input" value={chamado.titulo} onChange={e => setChamado({ ...chamado, titulo: e.target.value })} />
            <textarea className="input" value={chamado.descricao} onChange={e => setChamado({ ...chamado, descricao: e.target.value })} />
            <select className="input" value={chamado.status} onChange={e => setChamado({ ...chamado, status: e.target.value })}>
              <option value="aberto">Aberto</option>
              <option value="em andamento">Em andamento</option>
              <option value="fechado">Fechado</option>
            </select>
            <button type="submit" className="btn btn--primary">Salvar</button>
          </form>
        </div>
      </div>
    </>
  );
}
