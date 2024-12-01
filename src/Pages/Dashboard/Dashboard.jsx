import { useState } from "react";
import SelectedDayEvents from "../../Components/SelectedDayEvents/SelectedDayEvents";

import "./Dashboard.css";
import EventRecommendation from "../EventRecommendation/EventRecommendation";
import InterestBasedEvents from "../InterestBasedEvents/InterestBasedEvents";

function Dashboard() {
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
      <InterestBasedEvents />
      <EventRecommendation />
    </div>
  );
}

export default Dashboard;
