import React, { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "../../Components/EventCard/EventCard";
import "./EventRecommendation.css";

function EventRecommendation() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNearbyEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/event/recommendations-by-user-location",
          { withCredentials: true }
        );
        setEvents(response.data); // API'den gelen veri direkt olarak EventCard'a uyumlu
        setError("");
      } catch (err) {
        console.error(
          "Kullanıcı lokasyonuna göre etkinlik önerileri alınırken hata oluştu:",
          err.message
        );
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
        {events.length > 0
          ? events.map((event) => <EventCard key={event.id} event={event} />)
          : !error && <p>Yakın çevrenizde önerilen etkinlikler aranıyor...</p>}
      </div>
    </div>
  );
}

export default EventRecommendation;
