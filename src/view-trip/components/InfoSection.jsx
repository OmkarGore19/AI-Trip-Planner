import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { FaShareAlt } from "react-icons/fa";

function InfoSection({ trip }) {
  const locationLabel =
    trip?.userSelection?.location?.label || "Location not available";
  const [photoURL, setPhotoURL] = useState();

  useEffect(() => {
    if (trip && locationLabel !== "Location not available") {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: locationLabel,
    };
    try {
      const result = await GetPlaceDetails(data);
      //console.log(result.data);
      const photoURL = PHOTO_REF_URL.replace(
        "{NAME}",
        result.data.places[0].photos[2].name
      );
      setPhotoURL(photoURL);
    } catch (error) {
      //console.error(error);
      if (error.response) {
        //console.error(error.response.data);
      }
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: locationLabel,
          text: `🌍 Discover an amazing trip to ${locationLabel}! Planned with TourificAI - Your Personal AI Travel Assistant. 🚀 Let TourificAI create your perfect itinerary effortlessly!`,
          url: window.location.href, // You can adjust this to your desired URL
        });
        //console.log("Shared successfully!");
      } catch (error) {
        //console.error("Error sharing", error);
      }
    } else {
      console.log("Web Share API not supported in this browser.");
    }
  };

  return (
    <div className="font-ubuntu">
      <img
        src={photoURL ? photoURL : "/placeholder.jpg"}
        className="h-[340px] w-full object-cover rounded-xl"
        alt="Location"
      />

      <div className="flex justify-between items-center ">
        <div className="my-6 flex flex-col gap-2">
          <h2 className="font-bold text-2xl ">{locationLabel}</h2>
          {/* Flex container for Days, Budget, and Traveler */}
          <div className="flex flex-row flex-wrap gap-1">
            <h2 className="p-2 px-4 bg-gray-200 text-gray-600 rounded-2xl text-xs md:text-md">
              🗓️ {trip.userSelection?.noOfDays} Days
            </h2>
            <h2 className="p-2 px-4 bg-gray-200 text-gray-600 rounded-2xl text-xs md:text-md">
              💰 {trip.userSelection?.budget}
            </h2>
            <h2 className="p-2 px-4 bg-gray-200 text-gray-600 rounded-2xl text-xs md:text-md">
              🥂 {trip.userSelection?.traveler}
            </h2>
          </div>
        </div>

        <Button onClick={handleShare}>
          <FaShareAlt />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
