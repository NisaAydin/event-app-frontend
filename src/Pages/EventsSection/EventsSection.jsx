import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../../Components/EventCard/EventCard";
import "./EventsSection.css";

function EventsSection() {
  const [trendingEvents, setTrendingEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [loadingUpcoming, setLoadingUpcoming] = useState(true);
  const [errorTrending, setErrorTrending] = useState("");
  const [errorUpcoming, setErrorUpcoming] = useState("");

  // Fetch Trending Events
  useEffect(() => {
    const fetchTrendingEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/event/trending-events");
        setTrendingEvents(response.data);
      } catch (error) {
        console.error(
          "Trend etkinlikler alınırken hata oluştu:",
          error.response ? error.response.data : error.message
        );
        setErrorTrending(
          error.response?.data?.error ||
            "Trend etkinlikler yüklenirken bir hata oluştu."
        );
      } finally {
        setLoadingTrending(false);
      }
    };

    fetchTrendingEvents();
  }, []);

  // Fetch Upcoming Events
  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/event/public-upcoming-events"
        );
        setUpcomingEvents(response.data);
      } catch (error) {
        console.error(
          "Yaklaşan etkinlikler alınırken hata oluştu:",
          error.response ? error.response.data : error.message
        );
        setErrorUpcoming(
          error.response?.data?.error ||
            "Yaklaşan etkinlikler yüklenirken bir hata oluştu."
        );
      } finally {
        setLoadingUpcoming(false);
      }
    };

    fetchUpcomingEvents();
  }, []);

  return (
    <div className="events-section">
      {/* Trend Events Section */}
      <div className="section">
        <h2 className="section-title">Trend Etkinlikler</h2>
        <div className="events-grid">
          {loadingTrending ? (
            <p>Yükleniyor...</p>
          ) : errorTrending ? (
            <p>{errorTrending}</p>
          ) : (
            trendingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          )}
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="section">
        <h2 className="section-title">Yaklaşan Etkinlikler</h2>
        <div className="events-grid">
          {loadingUpcoming ? (
            <p>Yükleniyor...</p>
          ) : errorUpcoming ? (
            <p>{errorUpcoming}</p>
          ) : (
            upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default EventsSection;
