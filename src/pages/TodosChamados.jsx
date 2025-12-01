import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

export default function TodosChamados() {
  const [chamados, setChamados] = useState([]);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({ status: "" });

  // Carregar todos os chamados
  const carregarChamados = async () => {
    try {
      const res = await api.get("/chamados/todos");
      setChamados(res.data);
    } catch (erro) {
      alert(erro.response?.data?.mensagem || "Erro ao carregar chamados");
    }
  };

  useEffect(() => {
    carregarChamados();
  }, []);

  // Deletar chamado
  const deletarChamado = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este chamado?")) return;
    try {
      await api.delete(`/chamados/${id}`);
      alert("Chamado excluído com sucesso!");
      carregarChamados();
    } catch (erro) {
      alert(erro.response?.data?.mensagem || "Erro ao excluir chamado");
    }
  };

  // Entrar no modo de edição (somente status)
  const editarChamado = (chamado) => {
    setEditando(chamado.id);
    setForm({ status: chamado.status });
  };

  // Salvar edição
  const salvarEdicao = async (id) => {
    try {
      await api.put(`/chamados/${id}`, form);
      alert("Status atualizado com sucesso!");
      setEditando(null);
      carregarChamados();
    } catch (erro) {
      alert(erro.response?.data?.mensagem || "Erro ao atualizar status");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="app-container">
        <h2>Todos os Chamados (Técnico)</h2>

        {chamados.length === 0 ? (
          <p>Nenhum chamado encontrado.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {chamados.map((c) => (
              <li
                key={c.id}
                className="card"
                style={{
                  marginBottom: "1rem",
                  padding: "1rem",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  background: "#f9f9f9",
                }}
              >
                <p><strong>Título:</strong> {c.titulo}</p>
                <p><strong>Descrição:</strong> {c.descricao}</p>
                <p><strong>Categoria:</strong> {c.categoria}</p>
                <p><strong>Prioridade:</strong> {c.prioridade}</p>

                {editando === c.id ? (
                  <>
                    <label><strong>Status:</strong></label>
                    <select
                      className="input"
                      value={form.status}
                      onChange={(e) =>
                        setForm({ ...form, status: e.target.value })
                      }
                    >
                      <option value="aberto">Aberto</option>
                      <option value="em andamento">Em andamento</option>
                      <option value="concluido">Concluído</option>
                    </select>

                    <div style={{ marginTop: "0.5rem" }}>
                      <button
                        onClick={() => salvarEdicao(c.id)}
                        className="btn btn--primary"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={() => setEditando(null)}
                        className="btn btn--ghost"
                        style={{ marginLeft: "0.5rem" }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p><strong>Status:</strong> {c.status}</p>

                    <div style={{ marginTop: "0.5rem" }}>
                      <button
                        onClick={() => editarChamado(c)}
                        className="btn btn--primary"
                      >
                        Editar Status
                      </button>
                      <button
                        onClick={() => deletarChamado(c.id)}
                        className="btn btn--danger"
                        style={{ marginLeft: "0.5rem" }}
                      >
                        Excluir
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
