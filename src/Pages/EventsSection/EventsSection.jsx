import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../../Components/EventCard/EventCard";
import "./EventsSection.css";

function EventsSection() {
  const trendingEvents = [
    {
      id: 1,
      Category: { Category: "Sanat ve Kültür" }, // Kategori nesnesi
      EventName: "Timsah Ateşi", // Başlık
      Description: "Sanat dolu bir tiyatro oyunu.",
      Creator: { Name: "Swipe or Swap" }, // Etkinliği düzenleyen kişi
      EventDate: "2024-12-01",
      EventStartTime: "19:00",
      Location: "İstanbul",
      EventPicture:
        "https://cdn.bubilet.com.tr/files/Etkinlik/timsah-atesi-oyunu-99533.jpg",
    },
    {
      id: 2,
      Category: { Category: "Sağlıklı Yaşam" },
      EventName: "Meditasyon ve Yoga",
      Description: "Rahatlamak ve enerji kazanmak için.",
      Creator: { Name: "Misha" },
      EventDate: "2024-12-20",
      EventStartTime: "19:00",
      Location: "İstanbul",
      EventPicture:
        "https://blog.meditopia.com/wp-content/uploads/2021/09/NEW-4-2.jpg",
    },
    {
      id: 3,
      Category: { Category: "Sanat ve Kültür" },
      EventName: "Van Gogh Sergisi",
      Description:
        "Van Gogh’un eşsiz fırça darbeleriyle hayat bulan tabloları.",
      Creator: { Name: "Larina" },
      EventDate: "2024-12-01",
      EventStartTime: "21:00",
      Location: "İstanbul",
      EventPicture:
        "https://radyorjinal.com/wp-content/uploads/2022/06/van-gogh-dijital-sergisi-acildi-uOqGwd2i-450x300.jpg",
    },
  ];

  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/event/public-upcoming-events"
        );
        setUpcomingEvents(response.data);
      } catch (error) {
        console.error(
          "Yaklaşan etkinlikler alınırken hata oluştu:",
          error.response ? error.response.data : error.message
        );
        setError(
          error.response?.data?.error ||
            "Yaklaşan etkinlikler yüklenirken bir hata oluştu."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, []);

  return (
    <div className="events-section">
      <div className="section">
        <h2 className="section-title">Trend Etkinlikler</h2>
        <div className="events-grid">
          {trendingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Yaklaşan Etkinlikler</h2>
        <div className="events-grid">
          {loading ? (
            <p>Yükleniyor...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default EventsSection;
