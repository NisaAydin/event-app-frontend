/* eslint-disable react/prop-types */
import "./MyEventCard.css"; // Kart için özel stil dosyası
import { IoCalendarOutline, IoTimeOutline, IoLocationOutline } from "react-icons/io5";

function MyEventCard({ event, onClick, onDelete }) {
  return (
    <div className="my-event-card">
      <img
        src={`http://localhost:3000/${event.EventPicture}`}
        alt={event.EventName}
        className="my-event-image"
        onClick={onClick} // Kart tıklandığında düzenleme sayfasına yönlendirme
      />
      <div className="my-event-info">
        {/* Etkinlik Başlığı */}
        <h3 className="my-event-title">{event.EventName || "Etkinlik Adı Yok"}</h3>

        {/* Açıklama */}
        <p className="my-event-description">
          {event.Description || "Açıklama bulunmuyor."}
        </p>

        {/* Kategori */}
        <p className="my-event-category">
          <strong>Kategori:</strong> {event.Category?.Category || "Kategori belirtilmedi"}
        </p>

        {/* Tarih ve Zaman */}
        <div className="my-event-date-time">
          <p className="my-event-date">
            <IoCalendarOutline className="my-event-icon" />{" "}
            {new Date(event.EventDate).toLocaleDateString("tr-TR") || "Tarih belirtilmedi"}
          </p>
          <p className="my-event-time">
            <IoTimeOutline className="my-event-icon" />{" "}
            {event.EventStartTime || "Başlangıç saati belirtilmedi"} -{" "}
            {event.EventFinishTime || "Bitiş saati belirtilmedi"}
          </p>
        </div>

        {/* Konum */}
        <p className="my-event-location">
          <IoLocationOutline className="my-event-icon" />{" "}
          {event.Location || "Konum belirtilmedi"}
        </p>

        {/* Sil Butonu */}
        <button
          className="delete-event-button"
          onClick={() => onDelete(event.id)} // Silme işlemi tetiklenir
        >
          Sil
        </button>
      </div>
    </div>
  );
}

export default MyEventCard;
