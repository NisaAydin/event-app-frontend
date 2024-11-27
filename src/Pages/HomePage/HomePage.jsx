import React from "react";
import HomeSection from "../../Components/Home/HomeSection";
import EventsSection from "../EventsSection/EventsSection";
import ReviewSection from "../Review/ReviewSection";

function HomePage() {
  return (
    <div>
      <HomeSection />
      <EventsSection />
      <ReviewSection />
    </div>
  );
}

export default HomePage;
