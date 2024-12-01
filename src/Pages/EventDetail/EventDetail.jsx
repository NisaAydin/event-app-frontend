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

  const [isJoined, setIsJoined] = useState(false); 
  const { event } = location.state || {};

  useEffect(() => {
    if (!event?.id) return;

    const checkParticipation = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/participate/isParticipated/${event.id}`,
          { withCredentials: true }
        );
        setIsJoined(response.data.isParticipated);
      } catch (error) {
        console.error(
          "Katılım durumu kontrol edilirken bir hata oluştu:",
          error
        );
      }
    };

    checkParticipation();
  }, [event]);

  const handleJoinEvent = async () => {
    try {
      const sessionResponse = await axios.get(
        "http://localhost:3000/auth/check-session",
        { withCredentials: true }
      );

      if (!sessionResponse.data.authenticated) {
        toast.warning("Lütfen etkinliğe katılmadan önce giriş yapın.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/signin");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/participate/participateInEvent",
        { eventId: event.id },
        { withCredentials: true }
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

      setIsJoined(true);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.warning("Lütfen giriş yapın.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/signin");
      } else {
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
    }
  };
  console.log("Bura");

  const handleLeaveEvent = async () => {
    console.log("Bura2");
    try {
      const response = await axios.post(
        "http://localhost:3000/participate/leaveEvent",
        { eventId: event.id },
        { withCredentials: true }
      );

      console.log("Bura3");
      console.log("Gönderilen eventId:", event.id);
      console.log("Etkinlikten çıkış başarılı:", response.data);

      setIsJoined(false);
      toast.success("Etkinlikten başarıyla ayrıldınız.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error(
        "Etkinlikten çıkış sırasında hata oluştu:",
        error.response?.data || error.message
      );
      toast.error(
        `Etkinlikten çıkış sırasında bir hata oluştu: ${
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

  const handleBackButton = () => {
    navigate("/dashboard");
  };

  if (!event) {
    return <p className="event-detail-error">Etkinlik bilgisi bulunamadı!</p>;
  }

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
            onClick={handleLeaveEvent}
            variant="toggle"
            className="joined-event-button"
            disabled={true}
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
