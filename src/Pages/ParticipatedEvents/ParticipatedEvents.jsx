import { useEffect, useState } from "react";
import axios from "axios";
import ParticipatedEventCard from "../../Components/ParticipatedEventCard/ParticipatedEventCard";
import "./ParticipatedEvents.css";

function ParticipatedEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchParticipatedEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/event/participated-events",
          { withCredentials: true }
        );
        setEvents(response.data);
      } catch (error) {
        console.error(
          "Katıldığınız etkinlikler alınırken bir hata oluştu:",
          error.message
        );
        setError("Katıldığınız etkinlikler alınırken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchParticipatedEvents();
  }, []);

  return (
    <div className="participated-events-container">
      <h1>Katıldığınız Etkinlikler</h1>
      {loading ? (
        <p>Yükleniyor...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : events.length > 0 ? (
        <div className="participated-events-grid">
          {events.map((event) => (
            <ParticipatedEventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p>Henüz hiçbir etkinliğe katılmadınız.</p>
      )}
    </div>
  );
}

export default ParticipatedEvents;
