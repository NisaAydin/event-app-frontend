import { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "../../Components/EventCard/EventCard";
import "./EventRecommendation.css";
import Slider from "../../Components/Slider/Slider";

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

      {events.length > 0 ? (
        <Slider
          items={events}
          renderItem={(event, index) => <EventCard key={index} event={event} />}
        />
      ) : (
        !error && <p>Yakın çevrenizde önerilen etkinlikler aranıyor...</p>
      )}
    </div>
  );
}

export default EventRecommendation;
