import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

const RatingStars = ({ setonChange }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (value) => {
    setRating(value);
    setonChange(value);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((value) => (
        <FontAwesomeIcon
          fontSize={18}
          key={value}
          icon={value <= rating ? solidStar : regularStar}
          onClick={() => handleStarClick(value)}
          style={{
            cursor: "pointer",
            color: value <= rating ? "#eaff70" : "inherit",
          }}
        />
      ))}
    </div>
  );
};

export default RatingStars;
