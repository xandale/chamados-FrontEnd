import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [perfil, setPerfil] = useState("usuario");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/usuarios", { nome, email, senha, perfil });
      alert("Usuário cadastrado com sucesso!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.mensagem || "Erro ao cadastrar");
    }
  };

  return (
    <div className="app-container">
      <div className="card" style={{ maxWidth: 520, margin: "2rem auto" }}>
        <form onSubmit={handleSubmit} className="register-form">
          <h2 className="page-title">Registrar</h2>

          <input
            className="input"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="input"
            placeholder="Senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <select
            className="input"
            value={perfil}
            onChange={(e) => setPerfil(e.target.value)}
          >
            <option value="usuario">Usuário</option>
            <option value="tecnico">Técnico</option>
          </select>

          <button type="submit" className="btn btn--primary">
            Cadastrar
          </button>

          {/* 👇 Botão para voltar ao login */}
          <button
            type="button"
            style={{ marginTop: "1rem" }}
            onClick={() => navigate("/")}
          >
            Logar-se
          </button>
        </form>
      </div>
    </div>
  );
}