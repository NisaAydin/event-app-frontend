import { useState, useEffect } from "react";
import axios from "axios";
import TodayEventsCard from "../../Components/TodayEventsCard/TodayEventsCard";

function EventRecommendation() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNearbyEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/event/recommendations-by-user-location",
          { withCredentials: true } // Kullanıcı kimliğini doğrulamak için
        );
        setEvents(response.data);
        setError("");
      } catch (err) {
        console.error("Kullanıcı lokasyonuna göre etkinlik önerileri alınırken hata oluştu:", err.message);
        setError("Yakın çevrenizde etkinlik bulunamadı.");
        setEvents([]);
      }
    };

    fetchNearbyEvents();
  }, []);

  return (
    <div className="event-recommendation">
      <h2>Lokasyonunuza Göre Yakın Etkinlikler</h2>

      {error && <p className="error-message">{error}</p>}

      <div className="event-list">
        {events.length > 0 ? (
          events.map((event) => <TodayEventsCard key={event.id} event={event} />)
        ) : (
          !error && <p>Yakın çevrenizde önerilen etkinlikler aranıyor...</p>
        )}
      </div>
    </div>
  );
}

export default EventRecommendation;
