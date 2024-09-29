import React from "react";
import { Link } from "react-router-dom";
import HotelCard from "./HotelCardItem";
import HotelCardItem from "./HotelCardItem";

function Hotels({ trip }) {
  return (
    <div className="font-ubuntu">
      <h2 className="text-xl font-bold mt-5">Hotel Recommendation</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5 ">
        {trip?.tripData?.hotels?.map((hotel, index) => (
          <HotelCardItem hotel={hotel} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Hotels;
