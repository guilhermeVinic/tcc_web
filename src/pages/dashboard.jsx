// Dashboard.jsx
import { useEffect, useState } from "react";
import { fetchAgendamentos } from "../services/api";
import BookingCard from "../components/BookingCard";

export default function Dashboard() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAgendamentos(); // Busca do BD
        setAgendamentos(data);
        setCarregando(false);
      } catch (error) {
        console.error("Erro ao carregar agendamentos:", error);
      }
    };
    loadData();
  }, []);

  return (
    <div>
      <h1>Agendamentos Hoje</h1>
      {carregando ? (
        <p>Carregando...</p>
      ) : (
        agendamentos.map((agenda) => (
          <BookingCard key={agenda.id} data={agenda} />
        ))
      )}
    </div>
  );
}