// Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../services/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginAdmin(email, senha); // Verifica no BD
      navigate("/dashboard"); // Redireciona se OK
    } catch (error) {
      setErro("E-mail ou senha incorretos");
    }
  };

  return (
    <div className="login-container">
      <h1>Acesso Restrito</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail do administrador"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
        {erro && <p className="error">{erro}</p>}
      </form>
    </div>
  );
}