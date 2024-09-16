import { Button } from "@/components/ui/button";
import { GetPlaceDetails } from "@/service/GlobalAPI";
import React, { useEffect } from "react";
import { FaShareAlt } from "react-icons/fa";

function InfoSection({ trip }) {
  const locationLabel =
    trip?.userSelection?.location?.label || "Location not available";

  useEffect(() => {
    trip&&GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: locationLabel
    };
    try {
      const result = await GetPlaceDetails(data);
      console.log(result.data);
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error(error.response.data);
      }
    }
  };

  return (
    <div className="font-ubuntu">
      <img
        src="/placeholder.jpg"
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

        <Button>
          <FaShareAlt />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
