import { useEffect, useState } from "react";
import axios from "axios";

import EventCard from "../../Components/EventCard/EventCard";

function InterestBasedEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchInterestBasedEvents() {
      try {
        const response = await axios.get(
          "http://localhost:3000/event/user-interest-events",
          {
            withCredentials: true, // JWT veya oturum doğrulama için
          }
        );
        setEvents(response.data);
        setError("");
      } catch (error) {
        console.error(
          "İlgi alanlarına göre etkinlik önerileri alınırken hata oluştu: ",
          error.message
        );
        setError("Yakın çevrenizde etkinlik bulunamadı.");
      } finally {
        setLoading(false);
      }
    }

    fetchInterestBasedEvents();
  }, []);

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  if (events.length === 0) {
    return <p>İlgi alanlarınıza uygun etkinlik bulunamadı.</p>;
  }

  return (
    <div className="event-recommendation">
      <h2>İlgi Alanlarınıza Uygun Etkinlikler</h2>
      <div className="event-list">
        {events.length > 0
          ? events.map((event) => <EventCard key={event.id} event={event} />)
          : !error && <p>Yakın çevrenizde önerilen etkinlikler aranıyor...</p>}
      </div>
    </div>
  );
}

export default InterestBasedEvents;
