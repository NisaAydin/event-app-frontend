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
            🎉 <span>Katıl ve Ayrıcalıklardan Yararlan!</span>
          </div>
          <h1 className="hero-title">
            Çevrenizdeki <span>Heyecan Verici</span> Etkinlikleri Keşfedin
          </h1>
          <p className="hero-description">
            İlgi alanlarınıza göre düzenlenmiş etkinlikleri keşfedin, yeni
            insanlarla tanışın ve unutulmaz anılar biriktirin. EventHub ile
            yolculuğunuza bugün başlayın!
          </p>
          <button className="hero-button" onClick={handleGetStartedClick}>
            Hemen Başla
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
