import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/dashboard.css';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [agendamentos, setAgendamentos] = useState([
    { id: 1, cliente: "João Silva", data: "15/05", hora: "14:00", servico: "Lavagem Completa" },
    { id: 2, cliente: "Maria Souza", data: "16/05", hora: "10:30", servico: "Lavagem Rápida" }
  ]);
  const [novoAgendamento, setNovoAgendamento] = useState({
    cliente: '',
    data: '',
    hora: '',
    servico: 'Completa'
  });

  const handleLogout = () => {
    navigate('/');
  };

  const handleCancelar = (id) => {
    setAgendamentos(agendamentos.filter(ag => ag.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoId = Math.max(...agendamentos.map(a => a.id), 0) + 1;
    setAgendamentos([
      ...agendamentos,
      {
        id: novoId,
        ...novoAgendamento
      }
    ]);
    setNovoAgendamento({ cliente: '', data: '', hora: '', servico: 'Completa' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoAgendamento({
      ...novoAgendamento,
      [name]: value
    });
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Painel de Controle</h1>
        <button className="logout-button" onClick={handleLogout}>
          Sair
        </button>
      </header>

      <div className="dashboard-content">
        <section className="agendamento-form">
          <h2>Novo Agendamento</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Cliente:</label>
              <input
                type="text"
                name="cliente"
                value={novoAgendamento.cliente}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Data:</label>
                <input
                  type="date"
                  name="data"
                  value={novoAgendamento.data}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label>Hora:</label>
                <input
                  type="time"
                  name="hora"
                  value={novoAgendamento.hora}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Serviço:</label>
              <select
                name="servico"
                value={novoAgendamento.servico}
                onChange={handleChange}
                className="form-input"
              >
                <option value="Completa">Lavagem Completa</option>
                <option value="Rápida">Lavagem Rápida</option>
                <option value="Premium">Lavagem Premium</option>
              </select>
            </div>
            <button type="submit" className="submit-button">
              Agendar
            </button>
          </form>
        </section>

        <section className="agendamentos-list">
          <h2>Agendamentos</h2>
          {agendamentos.length === 0 ? (
            <p className="empty-message">Nenhum agendamento encontrado</p>
          ) : (
            agendamentos.map((item) => (
              <div key={item.id} className="agendamento-card">
                <h3>{item.cliente}</h3>
                <p><strong>Data/Hora:</strong> {item.data} às {item.hora}</p>
                <p><strong>Serviço:</strong> {item.servico}</p>
                <button
                  className="cancel-button"
                  onClick={() => handleCancelar(item.id)}
                >
                  Cancelar
                </button>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}