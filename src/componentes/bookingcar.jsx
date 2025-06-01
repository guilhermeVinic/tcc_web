// BookingCard.jsx
export default function BookingCard({ data }) {
    return (
      <div className="booking-card">
        <h3>{data.clienteNome}</h3>
        <p>
          <strong>Horário:</strong> {new Date(data.dataAgendamento).toLocaleString()}
        </p>
        <p>
          <strong>Serviço:</strong> {data.tipoLavagem}
        </p>
        <p>
          <strong>Veículo:</strong> {data.veiculoModelo} ({data.veiculoPlaca})
        </p>
        <button onClick={() => console.log("Marcar como concluído")}>
          Concluir
        </button>
      </div>
    );
  }