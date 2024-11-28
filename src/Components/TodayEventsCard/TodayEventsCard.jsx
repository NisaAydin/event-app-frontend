import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./TodayEventsCard.css";
import {
  IoCalendarOutline,
  IoTimeOutline,
  IoLocationOutline,
} from "react-icons/io5";

function TodayEventsCard({ event }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Detay sayfasına geçerken veriyi state ile gönderiyoruz
    navigate("/event-detail", { state: { event } });
  };

  return (
    <div onClick={handleCardClick} className="today-event-card">
      <img src={event.image} alt={event.title} className="today-event-image" />
      <div className="today-event-info">
        {/* Kategori */}
        <div className="today-event-category">{event.category}</div>

        {/* Başlık */}
        <h3 className="today-event-title">{event.title}</h3>

        {/* Açıklama */}
        <p className="today-event-description">{event.description}</p>

        {/* Tarih ve Zaman */}
        <div className="today-event-date-location">
          <div className="today-event-date-time">
            <p className="today-event-date">
              <IoCalendarOutline className="today-event-icon" /> {event.date}
            </p>
            <p className="today-event-time">
              <IoTimeOutline className="today-event-icon" /> {event.time}
            </p>
          </div>

          {/* Konum */}
          <p className="today-event-location">
            <IoLocationOutline className="today-event-icon" /> {event.location}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TodayEventsCard;
