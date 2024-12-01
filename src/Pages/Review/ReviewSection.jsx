import React from "react";
import "./ReviewSection.css";
import ReviewCard from "../../Components/ReviewCard/ReviewCard";
import eventPlannerImage from "../../assets/images/resimNisa.jpg";

function ReviewSection() {
  const reviews = [
    {
      id: 1,
      quote:
        "EventHub hayatımı değiştirdi. Sosyalleşmek için mükemmel bir platform!",
      name: "Nisa Aydın",
      role: "Founder & Leader",
      image: eventPlannerImage,
    },
    {
      id: 2,
      quote: "Hayatı daha eğlenceli hale getiriyor, denemelisiniz!",
      name: "Steve Mark",
      role: "Founder & Leader",
      image: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      quote: "Organizasyonlar için vazgeçilmez bir araç. Herkese öneririm!",
      name: "Kenn Topcu",
      role: "Event Specialist",
      image: "https://via.placeholder.com/50",
    },
  ];

  return (
    <section className="review-section">
      <div className="review-header">
        <h2 className="review-title">İnsanlar Bizim İçin Ne Diyor?</h2>
        <p className="review-description">
          EventHub sayesinde binlerce etkinlik katılımcısı bir araya geliyor.
        </p>
      </div>
      <div className="review-grid">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
}

export default ReviewSection;
