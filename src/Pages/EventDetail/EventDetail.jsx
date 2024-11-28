import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./EventDetail.css";
import Button from "../../Components/Button/Button";

function EventDetail() {
  const location = useLocation();
  const navigate = useNavigate();

  const { event } = location.state || {};

  if (!event) {
    return <p className="event-detail-error">Etkinlik bilgisi bulunamadı!</p>;
  }
  const handleJoinEvent = () => {
    alert("Etkinliğe katılınıyor.");
  };

  const handleBackButton = () => {
    navigate("/dashboard");
  };

  // Google Maps Embed API URL'si
  const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyB-K7bSzVpimqXlTacrLSpGE8ZtcD_KZ4A&q=${encodeURIComponent(
    event.location
  )}`;

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
        <Button
          text={"Etkinliğe Katıl"}
          onClick={handleJoinEvent}
          variant="toggle"
          className="join-event-button"
        ></Button>
      </div>

      {/* Harita Alanı */}
      <div className="event-detail-map">
        <h3>Etkinlik Konumu</h3>
        <iframe
          title="Etkinlik Haritası"
          className="event-detail-map-frame"
          src={googleMapsUrl}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      {/* Geri Dön Butonu */}

      <Button
        text={"Geri Dön"}
        onClick={handleBackButton}
        variant="toggle"
        className="event-detail-button"
      ></Button>
    </div>
  );
}

export default EventDetail;
