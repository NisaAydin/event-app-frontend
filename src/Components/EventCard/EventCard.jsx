/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import "./EventCard.css";
import {
  IoCalendarOutline,
  IoTimeOutline,
  IoLocationOutline,
  IoCreateOutline,
} from "react-icons/io5";

function EventCard({ event }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/event-detail", { state: { event } });
  };

  return (
    <div className="event-card" onClick={handleCardClick}>
      {/* Resim */}
      <img
        src={`http://localhost:3000/${event.EventPicture}`}
        alt={event.EventName || "Etkinlik"}
        className="event-image"
      />
      {/* Kategori */}
      <div className="event-category">
        {event.Category?.Category || "Kategori belirtilmedi"}
      </div>
      <div className="event-info">
        {/* Başlık */}
        <h3 className="event-title">{event.EventName || "Başlık Yok"}</h3>

        {/* Açıklama */}
        <p className="event-description">
          {event.Description || "Açıklama bulunmuyor."}
        </p>

        <p className="event-creator">
          <IoCreateOutline className="event-icon" />
          {event.CreatorName || "Bilinmiyor"}
        </p>

        {/* Tarih ve Zaman */}
        <div className="event-date-time">
          <p className="event-date">
            <IoCalendarOutline className="event-icon" />{" "}
            {new Date(event.EventDate).toLocaleDateString("tr-TR") ||
              "Tarih belirtilmedi"}
          </p>
          <p className="event-time">
            <IoTimeOutline className="event-icon" />{" "}
            {event.EventStartTime || "Saat belirtilmedi"}
          </p>
        </div>

        {/* Konum */}
        <p className="event-location">
          <IoLocationOutline className="event-icon" />{" "}
          {event.Location || "Konum belirtilmedi"}
        </p>
      </div>
    </div>
  );
}

export default EventCard;
