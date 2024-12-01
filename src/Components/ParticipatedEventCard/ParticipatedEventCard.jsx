/* eslint-disable react/prop-types */
import "./ParticipatedEventCard.css";
import {
  IoCalendarOutline,
  IoTimeOutline,
  IoLocationOutline,
} from "react-icons/io5";

function ParticipatedEventCard({ event }) {
  return (
    <div className="participated-event-card">
      {/* Etkinlik Resmi */}
      <img
        src={`http://localhost:3000/${event.EventPicture}`}
        alt={event.EventName}
        className="event-card-image"
      />

      {/* Etkinlik Bilgileri */}
      <div className="event-card-info">
        <h3 className="event-card-title">{event.EventName}</h3>
        <p className="event-card-category">
          {event.Category?.Category || "Kategori Yok"}
        </p>
        <p className="event-card-description">{event.Description}</p>

        <div className="event-card-meta">
          <p>
            <IoCalendarOutline />{" "}
            {new Date(event.EventDate).toLocaleDateString("tr-TR")}
          </p>
          <p>
            <IoTimeOutline /> {event.EventStartTime} - {event.EventFinishTime}
          </p>
          <p>
            <IoLocationOutline /> {event.Location}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ParticipatedEventCard;
