import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/admin.css';

export default function AdminPage() {
  const navigate = useNavigate();
  
  const [servicos, setServicos] = useState([
    { 
      id: 1, 
      nome: "Lavagem Básica", 
      descricao: "Lavagem externa e aspiração interna",
      preco: 30.00,
      tipo: "fixo",
      precoOriginal: 30.00
    },
    { 
      id: 2, 
      nome: "Lavagem Completa", 
      descricao: "Lavagem completa com cera e detalhes",
      preco: 50.00,
      tipo: "fixo",
      precoOriginal: 50.00
    },
    { 
      id: 3, 
      nome: "Lavagem Premium", 
      descricao: "Lavagem completa + polimento e proteção de pintura",
      preco: 80.00,
      tipo: "fixo",
      precoOriginal: 80.00
    }
  ]);

  const [editingId, setEditingId] = useState(null);

  const handleSave = (id) => {
    setEditingId(null);
    // API call would go here
  };

  const handleChange = (id, field, value) => {
    setServicos(servicos.map(servico => {
      if (servico.id === id) {
        const updated = { ...servico, [field]: value };
        if (field === 'tipo' && value === 'fixo') {
          updated.preco = updated.precoOriginal;
        }
        return updated;
      }
      return servico;
    }));
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="header-brand">
          <img src="/logo.png" alt="CleanWay Logo" className="header-logo" />
          <h1>CleanWay - Área Administrativa</h1>
        </div>
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          Voltar
        </button>
      </header>

      <main className="admin-main">
        <div className="admin-card">
          <h2>Gerenciamento de Serviços</h2>
          <p>Edite os serviços e promoções da CleanWay</p>
          
          <div className="servicos-grid">
            {servicos.map(servico => (
              <div key={servico.id} className="servico-card">
                {editingId === servico.id ? (
                  <div className="edit-mode">
                    {/* ... (código de edição mantido igual) ... */}
                  </div>
                ) : (
                  <div className="view-mode">
                    <h3>{servico.nome}</h3>
                    <p className="servico-desc">{servico.descricao}</p>
                    <div className={`price-tag ${servico.tipo}`}>
                      R$ {servico.preco.toFixed(2)}
                      {servico.tipo === "promocao" && (
                        <span className="promo-badge">PROMOÇÃO</span>
                      )}
                    </div>
                    <button 
                      className="edit-btn"
                      onClick={() => setEditingId(servico.id)}
                    >
                      Editar
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}