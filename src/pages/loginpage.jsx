import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/login.css';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Validação simples - na prática, verifique usuário/senha
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">
          <span className="logo-part-1">Lava</span>
          <span className="logo-part-2">Express</span>
        </h1>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
              className="login-input"
              placeholder="seu@email.com"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              className="login-input"
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Acessar Sistema
          </button>
        </form>
      </div>
    </div>
  );
}