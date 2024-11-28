import React, { useState } from "react";
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";
import TodayEventsCard from "../TodayEventsCard/TodayEventsCard";

import "./SelectedDayEvents.css";
import CreateEventCard from "../CreateEventCard/CreateEventCard";

function SelectedDayEvents() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Sahte Etkinlik Verileri
  const events = [
    {
      id: 1,
      title: "Art & Culture EventHub",
      description:
        "Sanat ve kültürün büyüleyici dünyasına adım atmaya hazır olun! Art & Culture Meetup etkinliği, yaratıcı zihinleri, kültür tutkunlarını ve topluluğunuzu bir araya getiren eşsiz bir deneyim sunuyor. Bu etkinlik, sadece sanat ve kültürü kutlamakla kalmıyor; aynı zamanda bireyleri sanatsal ifadeler ve kültürel paylaşımlar yoluyla birleştiriyor.",
      date: "2024-11-28",
      time: "7:00 PM",
      location: "City Center",
      image:
        "https://cdn.bubilet.com.tr/files/Etkinlik/timsah-atesi-oyunu-99533.jpg",
      category: "Art & Culture",
    },
    {
      id: 2,
      title: "Tech Innovators EventHub",
      description: "Discuss the latest in technology and innovation.",
      date: "2024-11-28",
      time: "3:00 PM",
      location: "Tech Hub",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScI3a-ug9eamJLD7NxlraKeVsrYp__gyvX8Q&s",
      category: "Technology",
    },
    {
      id: 3,
      title: "Art & Culture EventHub",
      description: "Join us for a cultural evening of fun and networking.",
      date: "2024-11-28",
      time: "7:00 PM",
      location: "City Center",
      image:
        "https://radyorjinal.com/wp-content/uploads/2022/06/van-gogh-dijital-sergisi-acildi-uOqGwd2i-450x300.jpg",
      category: "Art & Culture",
    },
  ];

  // Filtreleme
  const filteredEvents = events.filter(
    (event) => event.date === selectedDate.toISOString().split("T")[0]
  );
  // Dönen Date Objesini metne çevirir
  const formatDate = (date) => {
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleCreateEvent = () => {
    alert("Etkinlik oluştırma ekranına yönlendiriliyorsunuz.");
  };

  return (
    <div>
      <div className="selected-day-container">
        <aside className="selected-day-sidebar">
          <h3>Seçilen Tarih</h3>
          <CustomDatePicker onDateChange={setSelectedDate} />
          <CreateEventCard onCreateEvent={handleCreateEvent} />
        </aside>
        <main className="selected-day-main">
          <h3>{formatDate(selectedDate)} Tarihli Etkinlikler</h3>
          <div className="selected-day-event-list">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <TodayEventsCard key={event.id} event={event} />
              ))
            ) : (
              <p>Bu tarihte etkinlik bulunamadı.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default SelectedDayEvents;
