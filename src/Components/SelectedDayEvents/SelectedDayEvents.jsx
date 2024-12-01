import { useState, useEffect } from "react";
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";
import TodayEventsCard from "../TodayEventsCard/TodayEventsCard";
import axios from "axios";

import "./SelectedDayEvents.css";
import CreateEventCard from "../CreateEventCard/CreateEventCard";
import { useNavigate } from "react-router-dom";

function SelectedDayEvents() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const getFormattedDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const formattedDate = getFormattedDate(selectedDate);
        const response = await axios.post(
          "http://localhost:3000/event/events-by-date",
          { date: formattedDate },
          { withCredentials: true }
        );
        setEvents(response.data.events);
      } catch (error) {
        console.error("Etkinlikler alınırken bir hata oluştu:", error.message);
        setEvents([]);
      }
    };

    fetchEvents();
  }, [selectedDate]);

  const formatDate = (date) => {
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleCreateEvent = () => {
    navigate("/add-event");
  };

  return (
    <div>
      <div className="selected-day-container">
        <aside className="selected-day-sidebar">
          <h3>Seçilen Tarih</h3>
          <CustomDatePicker onDateChange={setSelectedDate} />
          <CreateEventCard onCreateEvent={handleCreateEvent} />
        </aside>
        <main className="selected-day-main">
          <h3>{formatDate(selectedDate)} Tarihli Etkinlikler</h3>
          <div className="selected-day-event-list">
            {events.length > 0 ? (
              events.map((event) => (
                <TodayEventsCard key={event.id} event={event} />
              ))
            ) : (
              <p>Bu tarihte etkinlik bulunamadı.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default SelectedDayEvents;
