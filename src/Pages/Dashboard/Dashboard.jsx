import React, { useState } from "react";
import SelectedDayEvents from "../../Components/SelectedDayEvents/SelectedDayEvents";
import EventsSection from "../EventsSection/EventsSection";

import "./Dashboard.css";

function Dashboard() {
  // Sahte Etkinlik Verileri
  const events = [
    {
      id: 1,
      title: "Art & Culture EventHub",
      description: "Join us for a cultural evening of fun and networking.",
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
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleCreateEvent = () => {
    alert("Etkinlik oluşturma ekranına yönlendiriliyorsunuz.");
  };

  return (
    <div className="dashboard">
      <SelectedDayEvents
        selectedDate={selectedDate}
        events={events}
        setSelectedDate={setSelectedDate}
        onCreateEvent={handleCreateEvent}
      />
      <EventsSection />
    </div>
  );
}

export default Dashboard;
