import React from "react";
import { Link } from "react-router-dom";

function PlaceCardItem({ place }) {
  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        place.PlaceName
      )}`}
      target="_blank"
    >
      <div className="border rounded-xl p-5 mt-2 flex gap-5 hover:scale-105 cursor-pointer transition-all hover:shadow-md">
        <img
          src="/placeholder.jpg"
          className="w-[130px] h-[130px] rounded-xl"
        />
        <div className="">
          <h2 className="font-bold text-lg">{place.PlaceName}</h2>
          <p className="text-sm text-gray-500">{place["Place Details"]}</p>
          <p className="mt-2">🕙 {place.timetotravel}</p>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
