import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/login.css';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-container">
          <img src="/logo.png" alt="CleanWay Logo" className="logo" />
          <h1 className="brand-title">CleanWay</h1>
          <p className="brand-slogan">Seu carro brilhando como novo</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
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