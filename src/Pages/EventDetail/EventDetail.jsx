import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./EventDetail.css";

function EventDetail() {
  const location = useLocation();
  const navigate = useNavigate();

  const { event } = location.state || {};

  if (!event) {
    return <p className="event-detail-error">Etkinlik bilgisi bulunamadı!</p>;
  }

  return (
    <div className="event-detail-container">
      {/* Üst Başlık */}
      <div className="event-detail-header">
        <img
          className="event-detail-image"
          src={event.image}
          alt={event.title}
        />
        <div className="event-detail-overlay">
          <h1 className="event-detail-title">{event.title}</h1>
          <p className="event-detail-category">{event.category}</p>
        </div>
      </div>

      {/* Etkinlik Bilgileri */}
      <div className="event-detail-content">
        <p className="event-detail-category2">{event.category}</p>
        <p className="event-detail-description">{event.description}</p>
        <div className="event-detail-info">
          <p>
            <strong>Tarih:</strong> {event.date}
          </p>
          <p>
            <strong>Saat:</strong> {event.time}
          </p>
          <p>
            <strong>Konum:</strong> {event.location}
          </p>
        </div>
      </div>

      {/* Siyah Alan (Map Yerine) */}
      <div className="event-detail-map-placeholder">
        <h3>Harita Alanı</h3>
      </div>

      {/* Geri Dön Butonu */}
      <button
        className="event-detail-button"
        onClick={() => navigate("/dashboard")}
      >
        Geri Dön
      </button>
    </div>
  );
}

export default EventDetail;
