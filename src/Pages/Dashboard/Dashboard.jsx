import { useState } from "react";
import SelectedDayEvents from "../../Components/SelectedDayEvents/SelectedDayEvents";
import EventsSection from "../EventsSection/EventsSection";

import "./Dashboard.css";

function Dashboard() {
  // Sahte Etkinlik Verileri
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleCreateEvent = () => {
    alert("Etkinlik oluşturma ekranına yönlendiriliyorsunuz.");
  };

  return (
    <div className="dashboard">
      <SelectedDayEvents
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        onCreateEvent={handleCreateEvent}
      />
      <EventsSection />
    </div>
  );
}

export default Dashboard;
