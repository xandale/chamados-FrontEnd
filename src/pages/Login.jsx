import { useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom"; // 👈 Importa Link

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", { email, senha });
      login(res.data.usuario, res.data.token);
      navigate("/chamados");
    } catch (err) {
      alert(err.response?.data?.mensagem || "Erro ao logar");
    }
  };

  return (
    <div className="app-container">
      <div className="card" style={{ maxWidth: 420, margin: "2rem auto" }}>
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="page-title">Login</h2>

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

          <button type="submit" className="btn btn--primary">
            Entrar
          </button>

          {/* 🔹 Botão Registrar-se */}
          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            Ainda não tem uma conta?{" "}
            <Link to="/register" style={{ color: "#4f46e5", textDecoration: "none", fontWeight: "600" }}>
              Registrar-se
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
