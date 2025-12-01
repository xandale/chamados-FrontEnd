import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

export default function MeusChamados() {
  const [chamados, setChamados] = useState([]);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    categoria: "",
    prioridade: "",
    status: ""
  });

  // Carregar os chamados
  const carregarChamados = async () => {
    const res = await api.get("/chamados");
    setChamados(res.data);
  };

  useEffect(() => {
    carregarChamados();
  }, []);

  // Deletar chamado
  const deletarChamado = async (id) => {
    if (!window.confirm("Tem certeza que deseja deletar este chamado?")) return;
    try {
      await api.delete(`/chamados/${id}`);
      alert("Chamado deletado com sucesso!");
      carregarChamados();
    } catch (erro) {
      alert(erro.response?.data?.mensagem || "Erro ao deletar chamado");
    }
  };

  // Entrar no modo de edição
  const editarChamado = (chamado) => {
    setEditando(chamado.id);
    setForm({
      titulo: chamado.titulo,
      descricao: chamado.descricao,
      categoria: chamado.categoria,
      prioridade: chamado.prioridade,
      status: chamado.status,
    });
  };

  // Salvar edição
  const salvarEdicao = async (id) => {
    try {
      await api.put(`/chamados/${id}`, form);
      alert("Chamado atualizado com sucesso!");
      setEditando(null);
      carregarChamados();
    } catch (erro) {
      alert(erro.response?.data?.mensagem || "Erro ao atualizar chamado");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="app-container">
        <h2>Meus Chamados</h2>

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
                  background: "#f9f9f9"
                }}
              >
                {editando === c.id ? (
                  <>
                    <label><strong>Título:</strong></label>
                    <input
                      className="input"
                      value={form.titulo}
                      onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                    />

                    <label><strong>Descrição:</strong></label>
                    <textarea
                      className="input"
                      value={form.descricao}
                      onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                    />

                    <label><strong>Categoria:</strong></label>
                    <input
                      className="input"
                      value={form.categoria}
                      onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                    />

                    <label><strong>Prioridade:</strong></label>
                    <select
                      className="input"
                      value={form.prioridade}
                      onChange={(e) => setForm({ ...form, prioridade: e.target.value })}
                    >
                      <option value="alta">Alta</option>
                      <option value="media">Média</option>
                      <option value="baixa">Baixa</option>
                    </select>

                    <label><strong>Status:</strong></label>
                    <select
                      className="input"
                      value={form.status}
                      onChange={(e) => setForm({ ...form, status: e.target.value })}
                    >
                      <option value="aberto">Aberto</option>
                      <option value="em andamento">Em andamento</option>
                      <option value="fechado">Fechado</option>
                    </select>

                    <div style={{ marginTop: "0.5rem" }}>
                      <button onClick={() => salvarEdicao(c.id)} className="btn btn--primary">
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
                    <p><strong>Título:</strong> {c.titulo}</p>
                    <p><strong>Descrição:</strong> {c.descricao}</p>
                    <p><strong>Categoria:</strong> {c.categoria}</p>
                    <p><strong>Prioridade:</strong> {c.prioridade}</p>
                    <p><strong>Status:</strong> {c.status}</p>

                    <div style={{ marginTop: "0.5rem" }}>
                      <button onClick={() => editarChamado(c)} className="btn btn--primary">
                        Editar
                      </button>
                      <button
                        onClick={() => deletarChamado(c.id)}
                        className="btn btn--danger"
                        style={{ marginLeft: "0.5rem" }}
                      >
                        Deletar
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
