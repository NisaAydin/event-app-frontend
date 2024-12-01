import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyEventCard from "../../Components/MyEventCard/MyEventCard"; // Yeni kart bileşeni

function MyEvents() {
  const [myEvents, setMyEvents] = useState([]); // Kullanıcının etkinlikleri
  const navigate = useNavigate();

  // Kullanıcının etkinliklerini backendden alma
  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/event/my-events",
          {
            withCredentials: true, // Kimlik doğrulama için cookie gönder
          }
        );
        setMyEvents(response.data); // Gelen veriyi state'e yükle
      } catch (error) {
        console.error(
          "Kendi etkinlikleriniz alınırken bir hata oluştu:",
          error.message
        );
      }
    };

    fetchMyEvents();
  }, [myEvents]);

  // Düzenleme sayfasına yönlendirme
  const handleEventClick = (eventId) => {
    navigate(`/update-event/${eventId}`); // Düzenleme sayfasına yönlendir
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm("Bu etkinliği silmek istediğinize emin misiniz?")) {
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:3000/event/delete-event/${eventId}`,
        {
          withCredentials: true, // Kimlik doğrulama için cookie gönder
        }
      );

      alert(response.data.message);

      // Etkinliği listeden kaldır
      setMyEvents(myEvents.filter((event) => event.id !== eventId));
    } catch (error) {
      alert(
        error.response?.data?.message || "Etkinlik silinirken bir hata oluştu."
      );
    }
  };

  return (
    <div className="my-events-container">
      <div className="my-events-list">
        {myEvents.length > 0 ? (
          myEvents.map((event) => (
            <MyEventCard
              key={event.id}
              event={event}
              onClick={() => handleEventClick(event.id)} 
              onDelete={handleDeleteEvent}
            />
          ))
        ) : (
          <p>Henüz bir etkinlik oluşturmadınız.</p>
        )}
      </div>
    </div>
  );
}

export default MyEvents;
