import { useLocation, useNavigate } from "react-router-dom";
import "./EventDetail.css";
import Button from "../../Components/Button/Button";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

function EventDetail() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isJoined, setIsJoined] = useState(false); // Kullanıcının etkinliğe katılıp katılmadığını kontrol etmek için state
  const { event } = location.state || {};

  // Etkinliğe Katılım Durumunu Kontrol Et
  useEffect(() => {
    // Eğer event tanımlı değilse, bu durumda hiçbir işlem yapma
    if (!event?.id) return;

    const checkParticipation = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/participate/isParticipated/${event.id}`,
          { withCredentials: true }
        );
        setIsJoined(response.data.isParticipated); // Backend'den gelen duruma göre state'i güncelle
      } catch (error) {
        console.error("Katılım durumu kontrol edilirken bir hata oluştu:", error);
      }
    };

    checkParticipation();
  }, [event]); // event objesi değiştiğinde tekrar kontrol edilir

  // Etkinliğe Katılma Butonu
  const handleJoinEvent = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/participate/participateInEvent", // Backend API'si
        { eventId: event.id }, // Gönderilen veri
        { withCredentials: true } // Cookie ile kimlik doğrulama
      );

      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setIsJoined(true); // Kullanıcı katıldıysa durumu güncelle
    } catch (error) {
      toast.error(
        `Etkinliğe katılma sırasında bir hata oluştu: ${
          error.response?.data?.message || error.message
        }`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  // Geri Dön Butonu
  const handleBackButton = () => {
    navigate("/dashboard");
  };

  // Eğer event bilgisi yoksa hata mesajı göster
  if (!event) {
    return <p className="event-detail-error">Etkinlik bilgisi bulunamadı!</p>;
  }

  // Google Maps Embed API URL'si
  const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyB-K7bSzVpimqXlTacrLSpGE8ZtcD_KZ4A&q=${encodeURIComponent(
    event.Location
  )}`;

  return (
    <div className="event-detail-container">
      {/* Toastify container */}
      <ToastContainer />

      {/* Üst Başlık */}
      <div className="event-detail-header">
        <img
          className="event-detail-image"
          src={`http://localhost:3000/${event.EventPicture.replace(
            /\\/g,
            "/"
          )}`}
          alt={event.EventName}
        />
        <div className="event-detail-overlay">
          <h1 className="event-detail-title">{event.EventName}</h1>
          <p className="event-detail-category">
            {event.Category?.Category || "Kategori belirtilmedi"}
          </p>
        </div>
      </div>

      {/* Etkinlik Bilgileri */}
      <div className="event-detail-content">
        <p className="event-detail-category2">
          {event.Category?.Category || "Kategori belirtilmedi"}
        </p>
        <p className="event-detail-description">
          {event.Description || "Açıklama bulunmuyor."}
        </p>
        <div className="event-detail-info">
          <p>
            <strong>Tarih:</strong>{" "}
            {new Date(event.EventDate).toLocaleDateString("tr-TR")}
          </p>
          <p>
            <strong>Saat:</strong> {event.EventStartTime} -{" "}
            {event.EventFinishTime}
          </p>
          <p>
            <strong>Konum:</strong> {event.Location}
          </p>
        </div>
        {isJoined ? (
          <Button
            text={"Katıldınız"}
            variant="toggle"
            className="joined-event-button"
            disabled={true} // Buton devre dışı
          />
        ) : (
          <Button
            text={"Etkinliğe Katıl"}
            onClick={handleJoinEvent}
            variant="toggle"
            className="join-event-button"
          />
        )}
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
      />
    </div>
  );
}

export default EventDetail;
