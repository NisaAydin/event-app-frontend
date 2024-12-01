/* eslint-disable react/prop-types */
import "./CreateEventCard.css";
import Button from "../Button/Button";

function CreateEventCard({ onCreateEvent }) {
  return (
    <div className="create-event-card">
      <h4>Aklınızda bir etkinlik fikri mi var?</h4>
      <p>İlhamınızı paylaşın ve etkinliğinizi hemen oluşturun.</p>
      <Button
        text={"Etkinlik Oluştur"}
        onClick={onCreateEvent}
        variant="primary"
        className="create-event-button"
      />
    </div>
  );
}

export default CreateEventCard;
