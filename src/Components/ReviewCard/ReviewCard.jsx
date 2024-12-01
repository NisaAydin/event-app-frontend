import React from "react";
import "./ReviewCard.css";

function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <div className="review-quote">
        <span className="quote-icon">“</span>
        <p>{review.quote}</p>
      </div>
      <div className="review-user">
        <img
          src={review.image}
          alt={review.name}
          className="review-user-image"
        />
        <div>
          <h4 className="review-user-name">{review.name}</h4>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
