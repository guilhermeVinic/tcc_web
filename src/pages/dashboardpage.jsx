import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/dashboard.css';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [agendamentos, setAgendamentos] = useState([]);
  const [filtro, setFiltro] = useState('hoje');
  const [carregando, setCarregando] = useState(true);

  // Simulação de dados da API
  useEffect(() => {
    const carregarAgendamentos = async () => {
      setCarregando(true);
      // Simulação de delay da API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const dadosMockados = [
        {
          id: 1,
          cliente: "João Silva",
          telefone: "(11) 99999-9999",
          veiculo: "Fiat Argo 2022",
          servico: "Lavagem Completa",
          data: "2023-11-15",
          hora: "14:00",
          status: "confirmado",
          valor: 50.00
        },
        {
          id: 2,
          cliente: "Maria Souza",
          telefone: "(11) 98888-8888",
          veiculo: "VW Gol 2020",
          servico: "Lavagem Básica",
          data: "2023-11-15",
          hora: "10:30",
          status: "concluido",
          valor: 30.00
        },
        {
          id: 3,
          cliente: "Carlos Oliveira",
          telefone: "(11) 97777-7777",
          veiculo: "Chevrolet Onix 2021",
          servico: "Lavagem Premium",
          data: "2023-11-16",
          hora: "09:00",
          status: "pendente",
          valor: 80.00
        }
      ];

      setAgendamentos(dadosMockados);
      setCarregando(false);
    };

    carregarAgendamentos();
  }, []);

  const filtrarAgendamentos = () => {
    const hoje = new Date().toISOString().split('T')[0];
    
    switch(filtro) {
      case 'hoje':
        return agendamentos.filter(ag => ag.data === hoje);
      case 'pendentes':
        return agendamentos.filter(ag => ag.status === 'pendente');
      case 'todos':
        return agendamentos;
      default:
        return agendamentos;
    }
  };

  const formatarData = (data) => {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const handleStatusChange = (id, novoStatus) => {
    setAgendamentos(agendamentos.map(ag => 
      ag.id === id ? { ...ag, status: novoStatus } : ag
    ));
  };

  const agendamentosFiltrados = filtrarAgendamentos();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-brand">
          <img src="/logo.png" alt="CleanWay Logo" className="header-logo" />
          <h1>CleanWay - Agendamentos</h1>
        </div>
        <button className="logout-button" onClick={() => navigate('/')}>
          Sair
        </button>
      </header>

      <main className="dashboard-main">
        <div className="controles-agendamento">
          <div className="filtros">
            <button 
              className={`filtro-btn ${filtro === 'hoje' ? 'active' : ''}`}
              onClick={() => setFiltro('hoje')}
            >
              Hoje
            </button>
            <button 
              className={`filtro-btn ${filtro === 'pendentes' ? 'active' : ''}`}
              onClick={() => setFiltro('pendentes')}
            >
              Pendentes
            </button>
            <button 
              className={`filtro-btn ${filtro === 'todos' ? 'active' : ''}`}
              onClick={() => setFiltro('todos')}
            >
              Todos
            </button>
          </div>
          
          <button 
            className="novo-agendamento-btn"
            onClick={() => navigate('/novo-agendamento')}
          >
            + Novo Agendamento
          </button>
        </div>

        {carregando ? (
          <div className="carregando">
            <div className="spinner"></div>
            <p>Carregando agendamentos...</p>
          </div>
        ) : agendamentosFiltrados.length === 0 ? (
          <div className="sem-agendamentos">
            <p>Nenhum agendamento encontrado</p>
          </div>
        ) : (
          <div className="agendamentos-lista">
            {agendamentosFiltrados.map(agendamento => (
              <div key={agendamento.id} className={`agendamento-card ${agendamento.status}`}>
                <div className="agendamento-header">
                  <h3>{agendamento.cliente}</h3>
                  <span className={`status-badge ${agendamento.status}`}>
                    {agendamento.status === 'confirmado' && 'Confirmado'}
                    {agendamento.status === 'pendente' && 'Pendente'}
                    {agendamento.status === 'concluido' && 'Concluído'}
                  </span>
                </div>
                
                <div className="agendamento-info">
                  <p><strong>Veículo:</strong> {agendamento.veiculo}</p>
                  <p><strong>Serviço:</strong> {agendamento.servico}</p>
                  <p><strong>Data/Hora:</strong> {formatarData(agendamento.data)} às {agendamento.hora}</p>
                  <p><strong>Valor:</strong> R$ {agendamento.valor.toFixed(2)}</p>
                  <p><strong>Telefone:</strong> {agendamento.telefone}</p>
                </div>
                
                <div className="agendamento-actions">
                  {agendamento.status === 'pendente' && (
                    <>
                      <button 
                        className="confirmar-btn"
                        onClick={() => handleStatusChange(agendamento.id, 'confirmado')}
                      >
                        Confirmar
                      </button>
                      <button 
                        className="cancelar-btn"
                        onClick={() => handleStatusChange(agendamento.id, 'cancelado')}
                      >
                        Cancelar
                      </button>
                    </>
                  )}
                  
                  {agendamento.status === 'confirmado' && (
                    <button 
                      className="concluir-btn"
                      onClick={() => handleStatusChange(agendamento.id, 'concluido')}
                    >
                      Marcar como Concluído
                    </button>
                  )}
                  
                  <button 
                    className="editar-btn"
                    onClick={() => navigate(`/editar-agendamento/${agendamento.id}`)}
                  >
                    Editar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}