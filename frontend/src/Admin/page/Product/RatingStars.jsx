import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

const RatingStars = ({ num }) => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((value) => (
        <FontAwesomeIcon
          fontSize={18}
          key={value}
          icon={value <= num ? solidStar : regularStar}
          style={{
            cursor: "pointer",
            color: value <= num ? "#eaff70" : "inherit",
          }}
        />
      ))}
    </div>
  );
};

export default RatingStars;
