import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

const RatingStars = ({ setonChange, number = 0 }) => {
  const [rating, setRating] = useState(number);

  useEffect(() => {
    setRating(number);
  }, [number]);

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
