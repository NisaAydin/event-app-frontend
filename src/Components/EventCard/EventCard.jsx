import React from "react";
import "./EventCard.css";
import { useNavigate } from "react-router-dom";
import {
  IoCalendarOutline,
  IoTimeOutline,
  IoLocationOutline,
} from "react-icons/io5";

function EventCard({ event }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/event-detail", { state: { event } });
  };
  return (
    <div className="event-card" onClick={handleCardClick}>
      <img src={event.image} alt={event.title} className="event-image" />
      <div className="event-info">
        {/* Kategori */}
        <div className="event-category">{event.category}</div>

        {/* Başlık */}
        <h3 className="event-title">{event.title}</h3>

        {/* Tarih ve Zaman */}
        <div className="event-date-time">
          <p className="event-date">
            <IoCalendarOutline className="event-icon" /> {event.date}
          </p>
          <p className="event-time">
            <IoTimeOutline className="event-icon" /> {event.time}
          </p>
        </div>

        {/* Konum */}
        <p className="event-location">
          <IoLocationOutline className="event-icon" /> {event.location}
        </p>
      </div>
    </div>
  );
}

export default EventCard;
