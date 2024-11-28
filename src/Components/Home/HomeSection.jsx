import React from "react";
import "./HomeSection.css";
import eventPlannerImage from "../../assets/images/event_planner5.png";
import { useNavigate } from "react-router-dom"; // useNavigate hook'unu ekleyin

function HomeSection() {
  const navigate = useNavigate(); // useNavigate fonksiyonunu başlatın
  const handleGetStartedClick = () => {
    navigate("/signup");
  };
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="hero-left">
          <div className="discount-tag">
            🎉 <span>Join Now for Exclusive Benefits</span>
          </div>
          <h1 className="hero-title">
            Discover <span>Exciting Events</span> Around You
          </h1>
          <p className="hero-description">
            Explore curated events based on your interests, meet new people, and
            create unforgettable memories. Start your journey with EventHub
            today!
          </p>
          <button className="hero-button" onClick={handleGetStartedClick}>
            Get Started
          </button>
        </div>
        <div className="hero-right">
          <img
            src={eventPlannerImage} // Bu, etkinlik uygulaman için uygun bir görsel olacak
            alt="Event illustration"
            className="hero-image"
          />
        </div>
      </div>
    </div>
  );
}

export default HomeSection;
