import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function Perfil() {
  const { usuario, logout } = useContext(AuthContext);
  const [dados, setDados] = useState(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  // 🔹 Buscar perfil
  useEffect(() => {
    const carregarPerfil = async () => {
      if (!usuario) return;
      try {
        const token = localStorage.getItem("token");
        const resposta = await api.get(`/usuarios/${usuario.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDados(resposta.data);
        setNome(resposta.data.nome);
        setEmail(resposta.data.email);
      } catch (erro) {
        console.error("Erro ao buscar perfil:", erro);
      }
    };
    carregarPerfil();
  }, [usuario]);

  // 🔹 Atualizar perfil
  const handleAtualizar = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await api.put(
        `/usuarios/${usuario.id}`,
        { nome, email, senha },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Perfil atualizado com sucesso!");
      setSenha("");
    } catch (erro) {
      alert(erro.response?.data?.mensagem || "Erro ao atualizar perfil");
    }
  };

  // 🔹 Deletar conta
  const handleDeletar = async () => {
    if (!window.confirm("Tem certeza que deseja deletar sua conta?")) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/usuarios/${usuario.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Conta deletada com sucesso!");
      logout();
      navigate("/login");
    } catch (erro) {
      alert(erro.response?.data?.mensagem || "Erro ao deletar conta");
    }
  };

  if (!dados) {
    return (
      <>
        <Navbar />
        <div className="app-container">
          <div
            className="card"
            style={{ maxWidth: 400, margin: "2rem auto", textAlign: "center" }}
          >
            <h2>Carregando perfil...</h2>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="app-container">
        <div className="card" style={{ maxWidth: 480, margin: "2rem auto" }}>
          <h2 className="page-title">Meu Perfil</h2>

          <form onSubmit={handleAtualizar} className="perfil-form">
            <label>Nome</label>
            <input
              className="input"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <label>Email</label>
            <input
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Nova Senha</label>
            <input
              className="input"
              type="password"
              placeholder="Deixe em branco para manter a atual"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <button type="submit" className="btn btn--primary">
              Atualizar Perfil
            </button>
          </form>

          <hr style={{ margin: "1.5rem 0" }} />

          <button onClick={handleDeletar} className="btn btn--danger">
            Deletar Conta
          </button>
        </div>
      </div>
    </>
  );
}
