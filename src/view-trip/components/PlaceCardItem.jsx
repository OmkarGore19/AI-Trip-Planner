import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PlaceCardItem({ place }) {
  const [photoURL, setPhotoURL] = useState();

  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place.placeName || place.PlaceName,
    };
    try {
      const result = await GetPlaceDetails(data);
      //console.log(result.data)
      const photoURL = PHOTO_REF_URL.replace(
        "{NAME}",
        result.data.places[0].photos[1].name
      );
      setPhotoURL(photoURL);
    } catch (error) {
      //console.error(error);
      if (error.response) {
        //console.error(error.response.data);
      }
    }
  };

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        place.placeName || place.PlaceName
      )}`}
      target="_blank"
    >
      <div className="border rounded-xl p-5 mt-2 flex flex-col gap-5 hover:scale-105 cursor-pointer transition-all hover:shadow-md font-ubuntu">
        <img
          src={photoURL ? photoURL : "/placeholder.jpg"}
          className="w-full h-[130px] rounded-xl object-cover"
        />
        <div className="flex-1">
          <h2 className="font-bold text-lg break-words">
            {place.placeName || place.PlaceName}
          </h2>
          <p className="text-sm text-gray-500 break-words overflow-hidden text-ellipsis">
            {place["Place Details"]}
          </p>
          <p className="mt-2">🎫 {place["ticket Pricing"]}</p>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
