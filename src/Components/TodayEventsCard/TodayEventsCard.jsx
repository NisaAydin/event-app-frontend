/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import "./TodayEventsCard.css";
import {
  IoCalendarOutline,
  IoTimeOutline,
  IoLocationOutline,
} from "react-icons/io5";

function TodayEventsCard({ event }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Detay sayfasına geçerken event ve currentUser bilgilerini state ile gönderiyoruz
    navigate("/event-detail", { state: { event } });
  };

  return (
    <div onClick={handleCardClick} className="today-event-card">
      <img
        src={`http://localhost:3000/${event.EventPicture}`} // Resmi göster
        alt={event.EventName}
        className="today-event-image"
      />
      <div className="today-event-info">
        {/* Kategori */}
        <div className="today-event-category">
          {event.Category?.Category || "Kategori belirtilmedi"}
        </div>

        {/* Başlık */}
        <h3 className="today-event-title">{event.EventName || "Başlık Yok"}</h3>

        {/* Açıklama */}
        <p className="today-event-description">
          {event.Description || "Açıklama bulunmuyor."}
        </p>

        {/* Tarih ve Zaman */}
        <div className="today-event-date-location">
          <div className="today-event-date-time">
            <p className="today-event-date">
              <IoCalendarOutline className="today-event-icon" />{" "}
              {new Date(event.EventDate).toLocaleDateString("tr-TR") ||
                "Tarih belirtilmemiş"}
            </p>
            <p className="today-event-time">
              <IoTimeOutline className="today-event-icon" />{" "}
              {event.EventStartTime || "Saat belirtilmemiş"}
            </p>
          </div>

          {/* Konum */}
          <p className="today-event-location">
            <IoLocationOutline className="today-event-icon" />{" "}
            {event.Location || "Konum belirtilmemiş"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TodayEventsCard;
