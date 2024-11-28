import React from "react";
import EventCard from "../../Components/EventCard/EventCard";
import "./EventsSection.css";
import image1 from "../../assets/images/event1.jpeg";

function EventsSection({ events }) {
  const trendingEvents = [
    {
      id: 1,
      category: "Sanat ve Kültür",
      title: "Timsah Ateşi",
      organizer: "Swipe or Swap",
      date: "01 Aralık 2024",
      time: "19:00",
      location: "İstanbul",
      image:
        "https://cdn.bubilet.com.tr/files/Etkinlik/timsah-atesi-oyunu-99533.jpg",
    },
    {
      id: 2,
      category: "Sağlıklı Yaşam",
      title: "Meditasyon ve Yoga",
      organizer: "Misha",
      date: "20 Aralık 2024",
      time: "19:00",
      location: "İstanbul",
      image:
        "https://blog.meditopia.com/wp-content/uploads/2021/09/NEW-4-2.jpg",
    },
    {
      id: 3,
      category: "Sanat ve Kültür",
      title: "Van Gogh Sergisi",
      organizer: "Larina",
      date: "01 Aralık 2024",
      time: "21:00",
      location: "İstanbul",
      image:
        "https://radyorjinal.com/wp-content/uploads/2022/06/van-gogh-dijital-sergisi-acildi-uOqGwd2i-450x300.jpg",
    },
  ];

  const upcomingEvents = [
    {
      id: 3,
      category: "Hobi ve Tutkular",
      title: "RY X Konserinde Buluşalım",
      organizer: "Notalis",
      date: "01 Aralık 2024",
      time: "19:00",
      location: "İstanbul",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBvd8rQdY0YHwZWIRi305NYS_Ft_m4fQqJ6A&s",
    },
  ];

  const recommendedEvents = [
    {
      id: 4,
      category: "Sosyal",
      title: "Make Friends Language Exchange",
      organizer: "BlaBla Language Exchange",
      date: "01 Aralık 2024",
      time: "19:00",
      location: "İstanbul",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBvd8rQdY0YHwZWIRi305NYS_Ft_m4fQqJ6A&s",
    },
  ];

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
        <h2 className="section-title">Sizin İçin Önerilenler</h2>
        <div className="events-grid">
          {recommendedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Yaklaşan Etkinlikler</h2>
        <div className="events-grid">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventsSection;
